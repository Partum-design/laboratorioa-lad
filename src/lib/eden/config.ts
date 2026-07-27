import "server-only";

// Configuración del middleware de Eden. Estas variables sólo se leen en el
// servidor: el token nunca debe viajar al navegador.
export interface EdenConfig {
  baseUrl: string;
  token: string;
  requireBirthDate: boolean;
  timeoutMs: number;
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
  };
}

// La página necesita saber si pedir la fecha de nacimiento sin exponer el resto
// de la configuración.
export function isBirthDateRequired(): boolean {
  return process.env.EDEN_REQUIRE_BIRTH_DATE === "true";
}
