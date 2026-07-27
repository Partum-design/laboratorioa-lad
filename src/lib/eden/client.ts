import "server-only";

import { getEdenConfig, type EdenConfig } from "@/lib/eden/config";
import type { EdenEnvelope, EdenOrder } from "@/lib/eden/types";

export type EdenResultado<T> =
  | { estado: "ok"; valor: T }
  | { estado: "no_encontrado" }
  | { estado: "sin_configurar" }
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

/**
 * Obtiene una orden por folio (o por el UUID que asigna Eden). El endpoint
 * `/orders/{id}/` acepta ambos: el identificador propio de Eden o el folio del
 * laboratorio, también conocido como accession_number.
 */
export async function obtenerOrdenPorFolio(folio: string): Promise<EdenResultado<EdenOrder>> {
  const config = getEdenConfig();
  if (!config) return { estado: "sin_configurar" };

  const primerIntento = await consultarOrden(config, folio);
  if (primerIntento.estado !== "no_encontrado") return primerIntento;

  // Los folios del laboratorio se registran en mayúsculas, pero la gente los
  // teclea como sea. Si no hubo coincidencia, reintentamos normalizado.
  const enMayusculas = folio.toUpperCase();
  if (enMayusculas === folio) return primerIntento;

  return consultarOrden(config, enMayusculas);
}

async function consultarOrden(config: EdenConfig, folio: string): Promise<EdenResultado<EdenOrder>> {
  const resultado = await pedir(config, `/orders/${encodeURIComponent(folio)}/`);
  if (resultado.estado !== "ok") return resultado;

  const sobre = resultado.valor as unknown as EdenEnvelope<EdenOrder | EdenOrder[]>;
  if (sobre.success === false) return { estado: "no_encontrado" };

  // Según el folio, Eden puede devolver el objeto directo o una lista con una
  // sola coincidencia.
  const contenido = sobre.data;
  const orden = Array.isArray(contenido) ? contenido[0] : contenido;
  if (!orden || !orden.id) return { estado: "no_encontrado" };

  return { estado: "ok", valor: orden };
}

/**
 * Pide a Eden la URL firmada del visor. Sirve como respaldo cuando la orden no
 * trae `public_study_viewer_link`. Este endpoint responde `{ url, success }`
 * sin el sobre habitual.
 */
export async function obtenerUrlVisor(folio: string): Promise<string | null> {
  const config = getEdenConfig();
  if (!config) return null;

  const resultado = await pedir(config, `/studies/link/?folio=${encodeURIComponent(folio)}`);
  if (resultado.estado !== "ok") return null;

  const cuerpo = resultado.valor as unknown as { url?: unknown; data?: { url?: unknown } | null };
  if (typeof cuerpo.url === "string") return cuerpo.url;
  if (cuerpo.data && typeof cuerpo.data.url === "string") return cuerpo.data.url;
  return null;
}
