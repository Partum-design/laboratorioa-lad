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
| `EDEN_REQUIRE_BIRTH_DATE` | no | `true` pide además la fecha de nacimiento del paciente y la verifica contra Eden. Default `false`. |
| `EDEN_API_TIMEOUT_MS` | no | Timeout por petición. Default `12000`. |
| `EDEN_SEARCH_MONTHS` | no | Meses hacia atrás que recorre la búsqueda. Default `3`. |
| `EDEN_PAGE_LIMIT` | no | Órdenes que se traen por mes. Default `500`. |

### Ambientes

| | URL |
|---|---|
| Staging | `https://middleware-staging.dev-land.space/api/v1` |
| Producción | `https://middleware.evacenter.com/api/v1` |

La documentación de Eden no publica la URL productiva. La de arriba responde con
el mismo API (mismo sobre de error ante una petición sin token) y es coherente
con el PACS productivo, `pacs.evacenter.com` — **pero hay que confirmarla con
Eden junto con el token de producción**, que es distinto al de staging y se
entrega hasta validar la integración en pruebas. Contacto:
integraciones@edenmed.com

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
2. Alta de `EDEN_API_URL`, `EDEN_API_TOKEN`, `EDEN_REQUIRE_BIRTH_DATE` (y
   opcionalmente `EDEN_API_TIMEOUT_MS`).
3. Marca `EDEN_API_TOKEN` como **Sensitive**.
4. Ambientes: usa el token de **staging** en Preview/Development y el de
   **producción** en Production. Eden entrega el token productivo hasta validar
   la integración en el ambiente de pruebas.
5. Redeploy — las variables sólo se aplican en un build nuevo.

Si falta cualquiera de las dos obligatorias, la página no truena: el endpoint
responde `503` con un mensaje que invita a contactar al laboratorio.

## 2. Arquitectura

```
Navegador
   │  POST /api/eden/consulta { folio, fechaNacimiento? }
   ▼
Route handler (servidor, Node runtime)
   │  GET /orders/{folio}/            ← Authorization: Token …
   │  GET /studies/link/?folio=…      ← sólo si falta el enlace público
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

> Lo que sigue está verificado **contra el staging real**, no sólo leído en la
> documentación. Varias cosas no coinciden con lo documentado.

### Límite de peticiones (lo que más condiciona el diseño)

Eden responde `403` con `errors.code = "Ratelimited"` a partir de la **décima
petición por minuto**, y el límite es **por token**, es decir compartido por
todos los visitantes del sitio a la vez. Medido: 9 peticiones seguidas pasan, la
10 se bloquea; se libera en menos de un minuto.

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

**Recomendación para producción:** activar `EDEN_REQUIRE_BIRTH_DATE=true`. Con el
folio solo, cualquiera que teclee folios válidos ve el nombre parcial y el tipo de
estudio. Con el segundo factor activo, una fecha equivocada responde exactamente
igual que un folio inexistente, para no confirmar que el folio existe.

## 5. Estado de las pruebas

Contra el **staging real**, con la orden `LAD-PRUEBA-001` (paciente
`LAD-PAC-001`, sucursal Matriz) creada por API para estas pruebas:

| Caso | Resultado |
|---|---|
| Folio de la orden | encontrada, detalle completo |
| Identificador de paciente | encontrada, misma orden |
| Minúsculas y espacios sobrantes | encontrada |
| UUID de Eden | encontrada |
| `EVA-PTT-0001000` (PACS sin orden) | `origen: "visor"`, con enlace firmado |
| Identificador inexistente | `404` |
| Segunda consulta (caché) | 9 ms contra 1003 ms de la primera |

Contra un **mock** con la forma del OpenAPI, lo que staging aún no permite
reproducir: estatus `SIGNED` con reporte firmado, descarga del PDF, y el segundo
factor con fecha correcta e incorrecta.

Para crear órdenes de prueba en staging, `facility_identifier` acepta
`FACILITY_01` o `FACILITY_02` (viene en la documentación, no en el OpenAPI; el
`eva-centro` de los ejemplos es rechazado).

## 6. Pendientes del lado de Eden

Vale la pena plantearles estos tres puntos, en este orden:

1. **Subir la cuota de peticiones.** ~10 por minuto por token es muy poco para un
   sitio público: hoy lo sostiene el caché de 60 s, pero cualquier pico lo
   rebasa. Es la limitación más seria de la integración.
2. **Arreglar `?folio=` en `GET /orders/`**, o habilitar el folio en
   `GET /orders/{id}/` como dice la documentación. Con eso la búsqueda sería una
   petición puntual y exacta, en vez de traer el listado del mes y filtrarlo
   aquí. Resolvería también el techo de `EDEN_PAGE_LIMIT`.
3. **Confirmar la URL y el token de producción** (ver *Ambientes*).

Falta además validar contra una orden con reporte firmado: la orden de prueba
está en `NEW` y no tiene estudio en el PACS, así que la descarga del PDF y las
etapas finales sólo están probadas contra el mock.
