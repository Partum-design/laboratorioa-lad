import "server-only";

import { guardarVentana, leerVentana } from "@/lib/eden/cache";
import { getEdenConfig, type EdenConfig } from "@/lib/eden/config";
import type { EdenEnvelope, EdenOrder } from "@/lib/eden/types";

export type EdenResultado<T> =
  | { estado: "ok"; valor: T }
  | { estado: "no_encontrado" }
  | { estado: "sin_configurar" }
  /** Eden respondió 403 Ratelimited: hay que dejar de pedirle por un rato. */
  | { estado: "limitado" }
  | { estado: "error"; detalle: string };

type CuerpoEden = Record<string, unknown> | unknown[] | null;

// Casi todos los endpoints responden con el sobre { data, errors, success },
// pero algunos (como /studies/link/) devuelven el objeto plano. Por eso esta
// capa entrega el cuerpo tal cual y cada consulta decide cómo leerlo.
async function pedir(config: EdenConfig, ruta: string, init?: RequestInit): Promise<EdenResultado<CuerpoEden>> {
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), config.timeoutMs);

  try {
    const respuesta = await fetch(`${config.baseUrl}${ruta}`, {
      ...init,
      headers: {
        Authorization: `Token ${config.token}`,
        Accept: "application/json",
        ...init?.headers,
      },
      signal: controlador.signal,
      cache: "no-store",
    });

    const texto = await respuesta.text();
    let cuerpo: CuerpoEden = null;
    try {
      cuerpo = texto ? (JSON.parse(texto) as CuerpoEden) : null;
    } catch {
      cuerpo = null;
    }

    if (respuesta.status === 404) return { estado: "no_encontrado" };

    // Eden limita las peticiones por token. Hay que rendirse de inmediato:
    // seguir insistiendo sólo alarga el bloqueo.
    if (respuesta.status === 403) {
      const codigo = (cuerpo as EdenEnvelope<unknown> | null)?.errors?.code;
      if (codigo === "Ratelimited") return { estado: "limitado" };
      return { estado: "error", detalle: "Permisos insuficientes en Eden" };
    }

    // Eden devuelve 400 tanto para "folio inexistente" (api_core_exception,
    // mensaje "Bad Request") como para parámetros mal formados. Para el
    // paciente ambos casos significan lo mismo: no hay estudio con ese folio.
    if (respuesta.status === 400) {
      const codigo = (cuerpo as EdenEnvelope<unknown> | null)?.errors?.code;
      if (codigo === "api_core_exception" || codigo === "study_not_found" || codigo === "not_found") {
        return { estado: "no_encontrado" };
      }
      return { estado: "error", detalle: `Solicitud rechazada por Eden (${codigo ?? "400"})` };
    }

    if (!respuesta.ok) return { estado: "error", detalle: `Eden respondió ${respuesta.status}` };
    if (!cuerpo) return { estado: "no_encontrado" };

    return { estado: "ok", valor: cuerpo };
  } catch (error) {
    const esTimeout = error instanceof Error && error.name === "AbortError";
    return { estado: "error", detalle: esTimeout ? "Tiempo de espera agotado" : "No se pudo contactar a Eden" };
  } finally {
    clearTimeout(temporizador);
  }
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Busca la orden que corresponde a lo que tecleó el paciente, que puede ser el
 * folio de la orden o el identificador de paciente (lo que el PACS muestra
 * como "ID").
 *
 * Ojo con lo que el API **realmente** soporta, verificado contra staging:
 * - `GET /orders/{id}/` funciona sólo con el UUID de Eden. Con el folio
 *   responde 400, pese a que la documentación dice que lo acepta.
 * - En el listado, `?folio=` se **ignora** (devuelve resultados aunque el folio
 *   no exista), así que el folio hay que filtrarlo aquí.
 * - `?patient_identifier=` sí filtra del lado de Eden.
 * - El listado exige `start_date`/`end_date` y no admite rangos de más de un
 *   mes, de ahí el barrido por ventanas mensuales.
 */
export async function obtenerOrdenPorFolio(valor: string): Promise<EdenResultado<EdenOrder>> {
  const config = getEdenConfig();
  if (!config) return { estado: "sin_configurar" };

  // Camino directo si el paciente pegó el identificador interno de Eden.
  if (UUID.test(valor)) {
    const porId = await consultarOrdenPorId(config, valor);
    if (porId.estado === "ok" || porId.estado === "limitado") return porId;
  }

  const buscado = valor.trim().toUpperCase();
  const limite = Date.now() + config.timeoutMs * 2;
  let huboError = false;

  // Se recorre de la ventana más reciente a la más antigua: lo normal es que el
  // estudio sea de estos días y se resuelva en la primera.
  for (let mes = 0; mes < config.mesesDeBusqueda; mes += 1) {
    if (Date.now() > limite) break;

    const ventana = await ordenesDeVentana(config, mes);
    if (ventana.estado === "limitado") return ventana;
    if (ventana.estado === "error") {
      huboError = true;
      continue;
    }
    if (ventana.estado !== "ok") continue;

    // Con el listado ya en memoria se comparan de una vez el folio y el
    // identificador de paciente, sin gastar otra petición.
    const coincide = ventana.valor.filter(
      (orden) =>
        esDeLaSucursal(config, orden) &&
        ((orden.folio ?? "").trim().toUpperCase() === buscado ||
          (orden.patient?.identifier ?? "").trim().toUpperCase() === buscado),
    );
    if (coincide.length > 0) return { estado: "ok", valor: masReciente(coincide) };
  }

  return huboError ? { estado: "error", detalle: "Búsqueda incompleta" } : { estado: "no_encontrado" };
}

/**
 * Trae las órdenes de una ventana mensual, con caché compartido. Es la única
 * petición que gasta una búsqueda, y se reaprovecha para todos los pacientes
 * que consulten en el mismo minuto.
 */
async function ordenesDeVentana(config: EdenConfig, mesesAtras: number): Promise<EdenResultado<EdenOrder[]>> {
  const { inicio, fin } = ventanaMensual(mesesAtras);
  const clave = `${config.baseUrl}|${inicio}|${fin}`;

  const guardadas = leerVentana(clave);
  if (guardadas) return { estado: "ok", valor: guardadas };

  // Se piden ordenadas de la más nueva a la más vieja: si el laboratorio genera
  // más órdenes al mes que `limit`, se conservan las relevantes.
  const consulta =
    `start_date=${encodeURIComponent(inicio)}&end_date=${encodeURIComponent(fin)}` +
    `&limit=${config.limitePorPagina}&ordering=created_at,desc`;

  const resultado = await listarOrdenes(config, consulta);
  if (resultado.estado === "ok") guardarVentana(clave, resultado.valor);

  return resultado;
}

/**
 * Ventana de un mes, alineada al día en UTC. La alineación es lo que hace que
 * la clave del caché sea estable: con la hora exacta cambiaría en cada
 * petición y el caché nunca acertaría.
 */
function ventanaMensual(mesesAtras: number): { inicio: string; fin: string } {
  const fin = new Date();
  fin.setUTCHours(0, 0, 0, 0);
  // Un día de holgura para no perder las órdenes de hoy ni las del borde.
  fin.setUTCDate(fin.getUTCDate() + 1);
  fin.setUTCMonth(fin.getUTCMonth() - mesesAtras);

  const inicio = new Date(fin);
  inicio.setUTCMonth(inicio.getUTCMonth() - 1);

  return { inicio: inicio.toISOString(), fin: fin.toISOString() };
}

/**
 * Deja pasar sólo las órdenes de nuestra sucursal.
 *
 * Se resuelve aquí y no en la petición porque el listado no sabe filtrarla:
 * `?facility_identifier=` se **ignora** (devuelve lo mismo con un valor
 * inexistente) y `?facility=` espera el UUID interno de Eden, no el
 * identificador que nos comparten. Verificado contra producción.
 *
 * Una orden sin sucursal informada pasa el filtro: preferimos mostrarla a
 * esconderle a un paciente su estudio por un dato incompleto de Eden.
 */
function esDeLaSucursal(config: EdenConfig, orden: EdenOrder): boolean {
  if (!config.sucursal) return true;

  const suya = orden.facility?.external_identifier?.trim().toLowerCase();
  return !suya || suya === config.sucursal;
}

/** Ante varias órdenes con el mismo identificador, la más nueva es la relevante. */
function masReciente(ordenes: EdenOrder[]): EdenOrder {
  return ordenes.reduce((mejor, actual) => {
    const fechaMejor = Date.parse(mejor.created_at ?? "") || 0;
    const fechaActual = Date.parse(actual.created_at ?? "") || 0;
    return fechaActual > fechaMejor ? actual : mejor;
  });
}

async function listarOrdenes(config: EdenConfig, consulta: string): Promise<EdenResultado<EdenOrder[]>> {
  const resultado = await pedir(config, `/orders/?${consulta}`);
  if (resultado.estado === "error" || resultado.estado === "limitado") return resultado;
  if (resultado.estado !== "ok") return { estado: "ok", valor: [] };

  const sobre = resultado.valor as unknown as EdenEnvelope<EdenOrder[] | { results?: EdenOrder[] }>;
  const contenido = sobre.data;

  // El listado responde un arreglo cuando hay resultados y
  // { total_count, results } cuando está vacío.
  if (Array.isArray(contenido)) return { estado: "ok", valor: contenido };
  return { estado: "ok", valor: contenido?.results ?? [] };
}

async function consultarOrdenPorId(config: EdenConfig, id: string): Promise<EdenResultado<EdenOrder>> {
  const resultado = await pedir(config, `/orders/${encodeURIComponent(id)}/`);
  if (resultado.estado !== "ok") return resultado;

  const sobre = resultado.valor as unknown as EdenEnvelope<EdenOrder | EdenOrder[]>;
  if (sobre.success === false) return { estado: "no_encontrado" };

  const contenido = sobre.data;
  const orden = Array.isArray(contenido) ? contenido[0] : contenido;
  if (!orden || !orden.id) return { estado: "no_encontrado" };
  // Pegar el UUID no debe ser una vía para ver órdenes de otra sucursal.
  if (!esDeLaSucursal(config, orden)) return { estado: "no_encontrado" };

  return { estado: "ok", valor: orden };
}

/**
 * Pide a Eden la URL firmada del visor. Este endpoint responde `{ url, success }`
 * sin el sobre habitual.
 *
 * Acepta dos parámetros distintos y hay que probar los dos:
 * - `folio`: el folio del estudio.
 * - `order_id`: pese al nombre, es el **identificador del paciente** (así lo
 *   documenta Eden, lo conservan por retrocompatibilidad). Es el valor que el
 *   PACS muestra como "ID" en la lista de estudios.
 */
export async function obtenerUrlVisor(
  valor: string,
): Promise<EdenResultado<{ url: string; identificador: string }>> {
  const config = getEdenConfig();
  if (!config) return { estado: "sin_configurar" };

  // `order_id` va primero porque es el caso real: los estudios cargados en el
  // PACS se localizan por el identificador de paciente, no por folio.
  const candidato = valor.toUpperCase();

  for (const parametro of ["order_id", "folio"] as const) {
    const resultado = await consultarVisor(config, parametro, candidato);
    if (resultado.estado === "limitado") return resultado;
    if (resultado.estado === "ok") {
      // Se devuelve el identificador que coincidió para mostrarlo tal como está
      // registrado, no como lo tecleó el paciente.
      return { estado: "ok", valor: { url: resultado.valor, identificador: candidato } };
    }
  }

  return { estado: "no_encontrado" };
}

async function consultarVisor(
  config: EdenConfig,
  parametro: string,
  valor: string,
): Promise<EdenResultado<string>> {
  const resultado = await pedir(config, `/studies/link/?${parametro}=${encodeURIComponent(valor)}`);
  if (resultado.estado !== "ok") return resultado;

  const cuerpo = resultado.valor as unknown as { url?: unknown; data?: { url?: unknown } | null };
  if (typeof cuerpo.url === "string") return { estado: "ok", valor: cuerpo.url };
  if (cuerpo.data && typeof cuerpo.data.url === "string") return { estado: "ok", valor: cuerpo.data.url };

  return { estado: "no_encontrado" };
}
