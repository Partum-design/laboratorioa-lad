# Integración con el API de Eden — Consulta de estudios por folio

Sección pública en `/acceder` donde un paciente escribe el folio de su estudio y
obtiene el avance y sus documentos, leyendo en vivo el API REST de Eden.

- Documentación de Eden: https://docs-middleware.edenmed.com/
- OpenAPI de staging: enlace dentro de la doc, sección *Ordenes*

## 1. Variables de entorno

| Variable | Obligatoria | Descripción |
|---|---|---|
| `EDEN_API_URL` | sí | URL base del API **incluyendo `/api/v1`**. Staging: `https://middleware-staging.dev-land.space/api/v1` |
| `EDEN_API_TOKEN` | sí | Token de Eden. Se envía como `Authorization: Token <valor>`. **Secreto.** |
| `EDEN_REQUIRE_BIRTH_DATE` | no | `true` pide además la fecha de nacimiento del paciente y la verifica contra Eden. Default `false`. |
| `EDEN_API_TIMEOUT_MS` | no | Timeout por petición. Default `12000`. |

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

**`GET /orders/{id}/`** — acepta el UUID de Eden **o el folio** del laboratorio
(alias `accession_number`). Es la vía principal y la que trae todo el detalle.

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

Comportamiento observado en staging (no sólo documentado):

- Folio inexistente → `400` con `errors.code = "api_core_exception"`, mensaje
  `"Bad Request"`. Se traduce a "no encontrado" para el paciente.
- `GET /orders/` (listado) exige `start_date`; **no se usa** en esta integración
  porque la consulta es puntual por folio.
- `GET /studies/link/?folio=…` responde `{ url, success }` **sin** el sobre
  `{ data, errors, success }` de los demás endpoints. El cliente contempla las
  dos formas.
- Estudio inexistente en `/studies/link/` → `404` con `code = "study_not_found"`.

Si el folio no coincide tal cual, se reintenta en mayúsculas.

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
- Límite de 12 consultas por minuto por IP (`src/lib/eden/limite.ts`). Vive en
  memoria del proceso: en Vercel el conteo es **por instancia**, así que frena el
  escaneo casual pero no es una defensa dura. Para un límite estricto, sustituir
  por Upstash/Redis sin tocar el resto del código.

**Recomendación para producción:** activar `EDEN_REQUIRE_BIRTH_DATE=true`. Con el
folio solo, cualquiera que teclee folios válidos ve el nombre parcial y el tipo de
estudio. Con el segundo factor activo, una fecha equivocada responde exactamente
igual que un folio inexistente, para no confirmar que el folio existe.

## 5. Estado de las pruebas

Probado contra el **staging real** (`EVA-PTT-0001000`): la consulta lo encuentra
por la vía de respaldo y entrega el visor firmado, tanto en mayúsculas como en
minúsculas o con espacios de sobra. Un identificador inexistente responde `404`.

Probado contra un **mock** con la forma del OpenAPI, porque staging todavía no
tiene una orden completa: consulta con orden y estatus `SIGNED`, folio
inexistente, segundo factor correcto e incorrecto, descarga de PDF y límite de
peticiones.

## 6. Pendientes del lado de Eden

- **Falta una orden de prueba con reporte firmado.** `GET /orders/` sigue en
  `total_count: 0`, así que la tarjeta completa (etapas, fechas, sucursal,
  descarga del PDF) sólo está validada contra el mock. Para probarla de punta a
  punta hay que crear la orden desde Eden Management, o pedir el
  `facility_identifier` de LAD para darla de alta por API — el `eva-centro` de la
  documentación es rechazado con `Invalid facility provided`.
- Falta el token del ambiente productivo.
