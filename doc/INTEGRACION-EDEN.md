# Integración con el API de Eden — Consulta de estudios por folio

Sección pública en `/acceder` donde un paciente escribe el folio de su estudio y
obtiene el avance y sus documentos, leyendo en vivo el API REST de Eden.

- Documentación de Eden: https://docs-middleware.edenmed.com/
- OpenAPI de staging: enlace dentro de la doc, sección *Ordenes*

## 1. Variables de entorno

| Variable | Obligatoria | Descripción |
|---|---|---|
| `EDEN_API_URL` | sí | URL base del API **incluyendo `/api/v1`**. |
| `EDEN_API_TOKEN` | sí | Token de Eden. Se envía como `Authorization: Token <valor>`. **Secreto.** |
| `EDEN_FACILITY_IDENTIFIER` | no | Sucursal (`facility.external_identifier`). En producción `matriz`. Vacío = sin filtro. |
| `EDEN_REQUIRE_BIRTH_DATE` | no | `true` pide además la fecha de nacimiento del paciente y la verifica contra Eden. Default `false`. |
| `EDEN_API_TIMEOUT_MS` | no | Timeout por petición. Default `12000`. |
| `EDEN_SEARCH_MONTHS` | no | Meses hacia atrás que recorre la búsqueda. Default `3`; en producción `4`. |
| `EDEN_PAGE_LIMIT` | no | Órdenes que se traen por mes. Default `500`. |

### Ambientes

| | URL | Estado |
|---|---|---|
| Staging | `https://middleware-staging.dev-land.space/api/v1` | validado |
| Producción | `https://middleware.evacenter.com/api/v1` | **validado en vivo** |

La URL productiva **quedó confirmada contra el API real**: responde `200` con el
token de producción y devuelve las órdenes de la sucursal Matriz. La
documentación de Eden sigue sin publicarla.

### Sucursal

Eden identifica la sucursal con `facility.external_identifier`, que en producción
es **`matriz`** (`facility.name` = "Matriz", UUID
`5187366f-4ed0-4dd8-8d10-af331f0e1f97`). La integración sólo muestra estudios de
la sucursal configurada, y el filtro se aplica también cuando el paciente pega el
UUID de una orden, para que ese no sea un rodeo.

El filtro se resuelve **sobre los resultados, no en la petición**, porque el
listado no sabe filtrar por sucursal (ver §3). Una orden que llegue sin
`facility` pasa el filtro: es preferible mostrarla a esconderle un estudio a un
paciente por un dato incompleto de Eden.

Ninguna lleva el prefijo `NEXT_PUBLIC_`: el token vive sólo en el servidor.
Verificado: no aparece en el HTML ni en los bundles de `.next/static`.

### Local

```bash
cp .env.example .env.local   # y captura el token
npm run dev
```

`.env.local` ya está en `.gitignore`.

### Vercel

1. Proyecto → **Settings → Environment Variables**.
2. Alta de `EDEN_API_URL`, `EDEN_API_TOKEN`, `EDEN_FACILITY_IDENTIFIER`,
   `EDEN_REQUIRE_BIRTH_DATE`, `EDEN_SEARCH_MONTHS` (y opcionalmente
   `EDEN_API_TIMEOUT_MS` y `EDEN_PAGE_LIMIT`).
3. Marca `EDEN_API_TOKEN` como **Sensitive**.
4. Ambientes: el token de **staging** en Preview/Development y el de
   **producción** en Production. Conviene mantenerlos separados: la cuota es por
   token, así que un Preview activo le comería peticiones al sitio en vivo.
5. Redeploy — las variables sólo se aplican en un build nuevo.

Los valores de producción, tal como quedaron en `.env.local`:

```
EDEN_API_URL=https://middleware.evacenter.com/api/v1
EDEN_API_TOKEN=<el token de producción — Sensitive>
EDEN_FACILITY_IDENTIFIER=matriz
EDEN_REQUIRE_BIRTH_DATE=false
EDEN_API_TIMEOUT_MS=12000
EDEN_SEARCH_MONTHS=4
EDEN_PAGE_LIMIT=500
```

Si falta cualquiera de las dos obligatorias, la página no truena: el endpoint
responde `503` con un mensaje que invita a contactar al laboratorio.

## 2. Arquitectura

```
Navegador
   │  POST /api/eden/consulta { folio, fechaNacimiento? }
   ▼
Route handler (servidor, Node runtime)
   │  GET /orders/?start_date=…&end_date=…   ← Authorization: Token …
   │     (listado del mes, cacheado 60 s; el folio y la sucursal se
   │      comparan aquí porque el API no sabe filtrarlos — ver §3)
   │  GET /orders/{uuid}/                    ← sólo si tecleó un UUID
   │  GET /studies/link/?order_id=…          ← respaldo: estudio sin orden
   ▼
Middleware de Eden
```

| Archivo | Responsabilidad |
|---|---|
| `src/lib/eden/config.ts` | Lectura de variables. `server-only`. |
| `src/lib/eden/types.ts` | Tipos del API y el **modelo público** que sí viaja al navegador. |
| `src/lib/eden/client.ts` | `fetch` con token, timeout y traducción de errores de Eden. |
| `src/lib/eden/presentar.ts` | Mapea la orden cruda al modelo público y traduce estatus. |
| `src/lib/eden/folio.ts` | Validación de folio y fecha (compartida cliente/servidor). |
| `src/lib/eden/limite.ts` | Límite de peticiones por IP. |
| `src/app/api/eden/consulta/route.ts` | `POST` — consulta por folio. |
| `src/app/api/eden/documento/route.ts` | `GET` — entrega el PDF sin exponer la URL de Eden. |
| `src/components/eden/ConsultaEstudio.tsx` | Formulario y tarjeta de resultado. |
| `src/app/acceder/page.tsx` | Página: consulta arriba, accesos del personal abajo. |

Ambas rutas usan `runtime = "nodejs"` y `dynamic = "force-dynamic"`: nunca se
cachea una consulta de expediente.

## 3. Endpoints de Eden que se consumen

> Lo que sigue está verificado **contra staging y contra producción**, no sólo
> leído en la documentación. Varias cosas no coinciden con lo documentado, y
> **producción se comporta igual que staging en todos los puntos**.

### Límite de peticiones (lo que más condiciona el diseño)

Eden responde `403` con `errors.code = "Ratelimited"`, y el límite es **por
token**, es decir compartido por todos los visitantes del sitio a la vez.
Medido en producción: **10 peticiones seguidas pasan, la 11 se bloquea**; se
libera en menos de un minuto. (En staging fue 9 y la 10.)

Lo que hace sostenible ese número es que el caché es por ventana de fechas y no
por paciente: el costo es de `EDEN_SEARCH_MONTHS` peticiones **por minuto para
todo el sitio**, no por visitante. Con `4` quedan 6 peticiones de holgura para
los enlaces del visor.

De ahí el diseño: **una búsqueda gasta una sola petición**, y el resultado se
cachea por ventana de fechas (`src/lib/eden/cache.ts`, 60 s), no por paciente.
La primera consulta del minuto trae el listado del mes y todas las demás se
resuelven en memoria. Medido: 1003 ms la primera, 9 ms las siguientes.

### `GET /orders/{id}/` — sólo con UUID

La documentación dice que acepta el folio; **no es cierto**. Con el folio
responde `400` (`api_core_exception` / `"Bad Request"`); sólo funciona con el
UUID que Eden asigna. Se conserva por si el paciente pega ese identificador.

### `GET /orders/` — el listado, que es la vía real

Es de donde sale todo. Comportamiento verificado:

- `start_date` es **obligatorio** y el rango **no puede exceder un mes**, de ahí
  el recorrido por ventanas mensuales.
- **`?folio=` se ignora**: devuelve resultados aunque el folio no exista. Por eso
  el folio se compara en nuestro código, no en el de Eden.
- `?patient_identifier=` sí filtra, igual que `?status=`.
- **`?facility_identifier=` se ignora**: con `matriz` y con un valor inexistente
  devuelve exactamente lo mismo. `?facility=` sí filtra, pero espera el **UUID**
  de la sucursal, no el identificador que Eden nos comparte. Por eso la sucursal
  se filtra del lado nuestro.
- `?modality=` y `?search=` **rompen la respuesta** (`data: null`). No usarlos.
- `data` es un **arreglo** cuando hay resultados y `{ total_count, results }`
  cuando está vacío. El cliente contempla las dos formas.

Como una sola petición sin filtros trae el listado del mes, se comparan de una
vez el folio **y** el identificador de paciente sobre esos datos. Eso permite que
el paciente escriba cualquiera de los dos.

### Estructura de la respuesta

`management_study`, `patient`, `modality`, `facility` y `pacs_study` coinciden
con el OpenAPI. Dos diferencias: la respuesta real trae además `main_item` y
`quote_item` (se ignoran), y **`management_study.code.code` es el código fiscal
SAT** (`85121800`), no la clave del estudio — ésa está en `internal_code`
(`USG-ABD`), que es la que se muestra.

**`GET /studies/link/`** — respaldo cuando no hay orden. Acepta dos parámetros y
la integración prueba los dos en orden:

- `folio`: el folio del estudio.
- `order_id`: **pese al nombre, es el identificador del paciente.** Así lo
  documenta Eden ("this field is actually the identifier of a patient, it is
  called order_id for backward compatibility reasons"). Es el valor que el PACS
  muestra como **"ID"** bajo el nombre del paciente en la lista de estudios.

### Estudios sin orden

Un estudio cargado con **"Upload study"** directo en el PACS **no genera orden**
en Eden Management: `GET /orders/{ese-id}/` responde `400` y el listado sigue en
`total_count: 0`. Comprobado con `EVA-PTT-0001000`, que sí aparece en
`pacs-staging.dev-land.space` pero no existe como orden.

Para ese caso la consulta cae al respaldo y responde con `origen: "visor"`: se
confirma que el estudio existe y se ofrece el enlace firmado a las imágenes,
pero sin avance, fechas ni reporte, porque el API no los expone sin orden. La
interfaz oculta la barra de etapas en vez de inventar un estatus.

Cuando el estudio **sí** tiene orden, la respuesta llega con `origen: "orden"` y
el detalle completo.

> El respaldo se desactiva si `EDEN_REQUIRE_BIRTH_DATE=true`: sin orden no hay
> fecha de nacimiento contra la cual verificar, así que en ese modo el estudio
> no se revela.

Notas de `/studies/link/`:

- Responde `{ url, success }` **sin** el sobre `{ data, errors, success }` de los
  demás endpoints. El cliente contempla las dos formas.
- Estudio inexistente → `404` con `code = "study_not_found"`.

### Orden en que se intenta la búsqueda

1. `GET /orders/{valor}/`, sólo si el valor tiene forma de UUID.
2. Listado del mes (cacheado) → se compara contra `folio` y contra
   `patient.identifier`. Se repite mes a mes hasta `EDEN_SEARCH_MONTHS`.
3. `GET /studies/link/?order_id=` y luego `?folio=`, para estudios sin orden.

Todo se compara en mayúsculas, así que da igual cómo lo teclee el paciente.
Si varias órdenes comparten identificador, se muestra la más reciente.

### Estatus mostrados

La orden trae `status` y, cuando ya hay estudio en el PACS, `pacs_study.status`,
que es más específico y tiene prioridad. Se agrupan en cuatro etapas visibles:

| Etapa | Estatus de Eden |
|---|---|
| Registrado | `NEW`, `PATIENT_ARRIVED` |
| En proceso | `IN_PROCESS` |
| Interpretación | `COMPLETED`, `IMAGES_SENT`, `READING_PENDING`, `READING`, `REVIEW_PENDING`, `IN_ADDENDUM` |
| Resultados | `SIGNED`, `ADDENDUM_SIGNED`, `DELIVERED` |

`CANCELLED` se muestra aparte. Un estatus desconocido cae en "Registrado" en vez
de romper la vista.

### Los PDF: `pdf_url` no siempre es un PDF

Detectado en producción y no documentado por Eden. Cuando el archivo todavía no
existe, `files.evacenter.com` **no responde 404**: contesta `302` hacia el portal
interno del personal (`apps.evacenter.com/management/order-detail/…`), que a su
vez responde `200` con el HTML de su aplicación Angular.

Dos consecuencias, las dos resueltas en `src/app/api/eden/documento/route.ts`:

1. Sin comprobarlo, al paciente se le entregaba esa página HTML renombrada como
   `.pdf`. Ahora se valida el `content-type` de la respuesta y, si no es un PDF,
   se responde "documento todavía no disponible".
2. La URL de ese redirect lleva **credenciales del personal** en el parámetro
   `ac=` (base64 de `user=…&password=…`). Nunca se sigue hacia el navegador: la
   petición se resuelve en el servidor y sólo se transmite el cuerpo si es un
   PDF, así que ni la URL ni las credenciales salen de ahí.

Como el enlace de descarga abre en pestaña nueva, los errores de esa ruta se
responden como **página HTML** cuando la petición viene de un navegador (y como
JSON en cualquier otro caso). Antes el paciente veía el JSON crudo en pantalla.

> Vale la pena preguntarle a Eden si `pdf_url` debería venir en `null` mientras
> el documento no exista, en vez de apuntar a un redirect con credenciales.

## 4. Manejo de datos personales

El folio por sí solo es un identificador adivinable, así que la respuesta pública
está recortada a propósito:

- **Se envía**: nombre enmascarado (`M. H. REBECA`), edad, nombre y modalidad del
  estudio, indicación, sucursal, médico solicitante, fechas y estatus.
- **No se envía**: correo, teléfono, identificador del paciente, fecha de
  nacimiento, UUIDs internos, ni las URL originales de Eden.
- Los PDF pasan por `/api/eden/documento`, que resuelve la URL en el servidor.
- Límite de 6 consultas por minuto por IP (`src/lib/eden/limite.ts`), pensado
  tanto para frenar el escaneo como para que una sola persona no agote la cuota
  de Eden, que es compartida. Vive en memoria del proceso: en Vercel el conteo es
  **por instancia**, así que no es una defensa dura. Para un límite estricto,
  sustituir por Upstash/Redis sin tocar el resto del código.

**Sobre `EDEN_REQUIRE_BIRTH_DATE`:** se decidió dejarlo en `false` para el
arranque en producción. Es una compensación consciente: con el folio solo,
cualquiera que teclee folios válidos ve el nombre parcial y el tipo de estudio,
pero a cambio siguen funcionando los estudios que sólo existen en el PACS, que es
el caso más frecuente. Activarlo es cambiar una variable de entorno y
redesplegar; con el segundo factor puesto, una fecha equivocada responde
exactamente igual que un folio inexistente, para no confirmar que el folio
existe.

## 5. Estado de las pruebas

### Contra producción (`middleware.evacenter.com`)

Con las órdenes reales de la sucursal Matriz, `m-00001-1` y `m-00003-1`
(paciente `PRE080301-001`):

| Caso | Resultado |
|---|---|
| Folio `m-00001-1` | encontrada, detalle completo, 3.4 s |
| Segunda consulta (caché) | **5 ms** |
| Folio en MAYÚSCULAS y con espacios | encontrada |
| Identificador de paciente `PRE080301-001` | encontrada |
| UUID de Eden | encontrada |
| Folio inexistente | `404` |
| Sucursal distinta (`EDEN_FACILITY_IDENTIFIER=otra`) | `404`, también por UUID |
| Descarga del PDF de la orden | `404` "todavía no disponible" (ver §3, `pdf_url`) |
| Cuota de peticiones | 10 pasan, la 11 responde `403 Ratelimited` |
| Token en los bundles del cliente | ausente (`grep` sobre `.next/static`) |

Falta por validar en producción, porque todavía no existe el dato: una orden con
**reporte firmado** (`SIGNED`) y su PDF, y un estudio cargado directo en el PACS
(hoy `/studies/link/` responde `study_not_found` para todo). Ambos caminos están
probados contra staging y contra un mock con la forma del OpenAPI.

### Contra staging

Mismos casos con la orden `LAD-PRUEBA-001` (paciente `LAD-PAC-001`), más
`EVA-PTT-0001000` para el respaldo del PACS sin orden (`origen: "visor"`, con
enlace firmado). Para crear órdenes de prueba ahí, `facility_identifier` acepta
`FACILITY_01` o `FACILITY_02` (viene en la documentación, no en el OpenAPI; el
`eva-centro` de los ejemplos es rechazado).

## 6. Pendientes del lado de Eden

Ya resuelto: la **URL y el token de producción** están confirmados y en uso, y el
`facility_identifier` de la sucursal es `matriz`.

Sigue pendiente plantearles estos cuatro puntos, en este orden:

1. **Subir la cuota de peticiones.** 10 por minuto por token es muy poco para un
   sitio público: hoy lo sostiene el caché de 60 s, pero cualquier pico lo
   rebasa. Es la limitación más seria de la integración.
2. **`pdf_url` apunta a un redirect con credenciales del personal** cuando el
   documento aún no existe, en vez de venir en `null` (ver §3). Es el punto con
   implicación de seguridad, aunque de nuestro lado ya está contenido.
3. **Arreglar `?folio=` en `GET /orders/`**, o habilitar el folio en
   `GET /orders/{id}/` como dice la documentación. Con eso la búsqueda sería una
   petición puntual y exacta, en vez de traer el listado del mes y filtrarlo
   aquí. Resolvería también el techo de `EDEN_PAGE_LIMIT`.
4. **`?facility_identifier=` no filtra** en `GET /orders/`: acepta cualquier
   valor y devuelve lo mismo. Si filtrara, la sucursal se resolvería del lado de
   Eden en vez del nuestro.

Falta además validar contra una orden con reporte firmado: las órdenes que hoy
existen en producción están en `NEW` y `PATIENT_ARRIVED`, sin estudio en el PACS,
así que la descarga del PDF y las etapas finales sólo están probadas contra el
mock y contra staging.
