import "server-only";

// Freno básico contra el tecleo masivo de folios. Vive en memoria del proceso,
// así que en Vercel el conteo es por instancia: no es una defensa perfecta,
// pero corta el escaneo automatizado desde una misma IP. Si más adelante hace
// falta un límite estricto, esto se sustituye por Upstash/Redis sin tocar el
// resto del código.
interface Ventana {
  intentos: number;
  reinicioEn: number;
}

const VENTANA_MS = 60_000;
const MAX_INTENTOS = 12;
const MAX_ENTRADAS = 5_000;

const registro = new Map<string, Ventana>();

function limpiar(ahora: number) {
  const vencidas: string[] = [];
  registro.forEach((ventana, clave) => {
    if (ventana.reinicioEn <= ahora) vencidas.push(clave);
  });
  vencidas.forEach((clave) => registro.delete(clave));
}

export interface ResultadoLimite {
  permitido: boolean;
  restantes: number;
  esperaSegundos: number;
}

export function consumirIntento(clave: string): ResultadoLimite {
  const ahora = Date.now();

  if (registro.size > MAX_ENTRADAS) limpiar(ahora);

  const actual = registro.get(clave);
  if (!actual || actual.reinicioEn <= ahora) {
    registro.set(clave, { intentos: 1, reinicioEn: ahora + VENTANA_MS });
    return { permitido: true, restantes: MAX_INTENTOS - 1, esperaSegundos: 0 };
  }

  actual.intentos += 1;
  const esperaSegundos = Math.max(1, Math.ceil((actual.reinicioEn - ahora) / 1000));

  if (actual.intentos > MAX_INTENTOS) {
    return { permitido: false, restantes: 0, esperaSegundos };
  }

  return { permitido: true, restantes: MAX_INTENTOS - actual.intentos, esperaSegundos };
}

/** Identifica al solicitante detrás del proxy de Vercel. */
export function identificarCliente(headers: Headers): string {
  const reenviado = headers.get("x-forwarded-for");
  if (reenviado) return reenviado.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "desconocido";
}
