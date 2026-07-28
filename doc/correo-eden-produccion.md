# Correo de seguimiento a Eden — ya en producción

**Para:** integraciones@edenmed.com
**Asunto:** LAD — Integración activa en producción: un punto de seguridad y tres
técnicos

> Contexto: las credenciales de producción ya llegaron y la integración está
> conectada y validada contra el API real (URL `middleware.evacenter.com/api/v1`,
> sucursal `matriz`). Lo que queda son los puntos que siguen abiertos del lado de
> Eden. El punto 1 es nuevo y salió al probar contra producción.

---

Buen día, equipo de Eden:

Les escribo de **Laboratorio de Apoyo y Diagnóstico (LAD)**. Ya conectamos la
integración al ambiente productivo con las credenciales que nos compartieron y la
validamos contra el API real. Todo quedó funcionando: la sección pública donde el
paciente consulta su estudio por folio ya lee producción.

Al probar surgieron cuatro puntos. El primero tiene implicación de seguridad y
por eso lo ponemos arriba.

## 1. `pdf_url` redirige a una URL con credenciales del personal

Cuando el PDF de una orden todavía no existe, `files.evacenter.com` no responde
`404`: responde **`302` hacia `apps.evacenter.com/management/order-detail/…`**,
el portal interno, que a su vez contesta `200` con el HTML de su aplicación.

Lo relevante es el parámetro `ac=` de ese redirect: viene en base64 y al
decodificarlo contiene `user=…&password=…&extra_validation=…`, es decir
**credenciales de acceso al portal de gestión**.

Reproducible con nuestra orden `m-00001-1`: el `pdf_url` que devuelve
`GET /orders/` lleva a ese redirect.

De nuestro lado ya está contenido — la petición se resuelve en el servidor,
validamos que la respuesta sea realmente un PDF y nunca exponemos esa URL al
navegador del paciente — pero nos parece que vale la pena revisarlo, porque
cualquier integración que simplemente siga el enlace terminaría publicando esas
credenciales.

**¿Sería posible que `pdf_url` venga en `null` mientras el documento no exista?**

## 2. Límite de peticiones

El API responde `403` con `errors.code: "Ratelimited"` a partir de la **onceava
petición por minuto**, y el límite aplica **por token**, es decir que lo comparten
todos los visitantes de nuestro sitio al mismo tiempo. (Medido en producción: 10
pasan, la 11 se bloquea.)

Lo sostenemos con un caché de 60 segundos del lado nuestro, de modo que el costo
sea de unas pocas peticiones por minuto para todo el sitio y no por visitante.
Aun así, para un portal público es un margen estrecho.

**¿Cuál es la cuota oficial y es posible ampliarla para nuestro token de
producción?** Si existe un esquema distinto para portales de pacientes, nos
interesa conocerlo.

## 3. La búsqueda por folio no filtra del lado del API

Dos comportamientos que verificamos también en producción, y que no coinciden con
la documentación:

- **`GET /orders/{id}/` no acepta el folio.** La documentación indica que acepta
  el `id` de Eden o el `folio` (`accession_number`); en la práctica sólo funciona
  con el UUID. Ejemplo: `GET /orders/m-00003-1/` → `400`
  (`api_core_exception`, `"Bad Request"`), mientras
  `GET /orders/fb0de21d-3633-…/` → `200`.
- **El parámetro `?folio=` del listado se ignora.** La respuesta trae los mismos
  resultados aunque el folio no exista; lo comprobamos con `?folio=NOEXISTE-XYZ`,
  que devolvió las órdenes de todas formas.

Por eso hoy traemos el listado completo de cada mes y filtramos el folio de
nuestro lado, lo cual es costoso y nos obliga a un tope de resultados. **Si
`?folio=` filtrara del lado del API, o si `/orders/{folio}/` aceptara el folio
como dice la documentación, nuestra búsqueda sería una sola petición exacta** y
además dejaría de consumir la cuota del punto 2.

De paso: `?modality=` y `?search=` devuelven `data: null` y rompen la respuesta.
`?patient_identifier=`, `?status=` y `?facility=` sí filtran correctamente.

## 4. `?facility_identifier=` no filtra

En `GET /orders/`, ese parámetro acepta cualquier valor y devuelve lo mismo:
probamos con `matriz` y con un identificador inexistente y la respuesta fue
idéntica. `?facility=` sí filtra, pero espera el UUID interno de la sucursal, no
el identificador que ustedes nos comparten.

Hoy resolvemos la sucursal comparando `facility.external_identifier` sobre los
resultados. Funciona, pero si `?facility_identifier=` filtrara sería del lado de
ustedes y nos ahorraría traer registros de más.

---

Quedamos atentos, sobre todo al punto 1. Con gusto les compartimos más detalle
para reproducir cualquiera de los cuatro.

Saludos cordiales,

**Bryan López López**
Laboratorio de Apoyo y Diagnóstico
bryan.lopez@partumdesign.com.mx
