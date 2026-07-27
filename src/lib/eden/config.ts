import "server-only";

// Configuración del middleware de Eden. Estas variables sólo se leen en el
// servidor: el token nunca debe viajar al navegador.
export interface EdenConfig {
  baseUrl: string;
  token: string;
  requireBirthDate: boolean;
  timeoutMs: number;
  /** Ventanas mensuales hacia atrás que recorre la búsqueda de una orden. */
  mesesDeBusqueda: number;
  /** Órdenes que se traen por ventana. Tope de lo que se puede encontrar. */
  limitePorPagina: number;
}

function readBaseUrl(): string {
  const raw = process.env.EDEN_API_URL?.trim();
  if (!raw) return "";
  // Aceptamos la URL con o sin diagonal final para que ambas formas funcionen.
  return raw.replace(/\/+$/, "");
}

export function getEdenConfig(): EdenConfig | null {
  const baseUrl = readBaseUrl();
  const token = process.env.EDEN_API_TOKEN?.trim();
  if (!baseUrl || !token) return null;

  return {
    baseUrl,
    token,
    // Segundo factor opcional: exige la fecha de nacimiento además del folio.
    requireBirthDate: process.env.EDEN_REQUIRE_BIRTH_DATE === "true",
    timeoutMs: Number(process.env.EDEN_API_TIMEOUT_MS ?? 12000),
    // Cada mes cuesta una petición y Eden limita a ~10 por minuto para todo el
    // token, así que el valor por omisión es conservador.
    mesesDeBusqueda: Math.min(12, Math.max(1, Number(process.env.EDEN_SEARCH_MONTHS ?? 3))),
    limitePorPagina: Math.min(1000, Math.max(10, Number(process.env.EDEN_PAGE_LIMIT ?? 500))),
  };
}

// La página necesita saber si pedir la fecha de nacimiento sin exponer el resto
// de la configuración.
export function isBirthDateRequired(): boolean {
  return process.env.EDEN_REQUIRE_BIRTH_DATE === "true";
}
