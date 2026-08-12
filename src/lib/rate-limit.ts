import "server-only";

// Freno básico en memoria contra abuso (pagos, chatbot). Por instancia de
// Vercel, no es una defensa perfecta, pero corta el reintento automatizado
// desde una misma IP. Mismo patrón que src/lib/eden/limite.ts.
interface Ventana {
  intentos: number;
  reinicioEn: number;
}

const registros = new Map<string, Map<string, Ventana>>();

export interface ResultadoLimite {
  permitido: boolean;
  esperaSegundos: number;
}

export function consumirIntento(bucket: string, clave: string, maxIntentos: number, ventanaMs = 60_000): ResultadoLimite {
  const ahora = Date.now();
  let registro = registros.get(bucket);
  if (!registro) {
    registro = new Map();
    registros.set(bucket, registro);
  }

  if (registro.size > 5_000) {
    const vencidas: string[] = [];
    registro.forEach((ventana, key) => {
      if (ventana.reinicioEn <= ahora) vencidas.push(key);
    });
    vencidas.forEach((key) => registro!.delete(key));
  }

  const actual = registro.get(clave);
  if (!actual || actual.reinicioEn <= ahora) {
    registro.set(clave, { intentos: 1, reinicioEn: ahora + ventanaMs });
    return { permitido: true, esperaSegundos: 0 };
  }

  actual.intentos += 1;
  const esperaSegundos = Math.max(1, Math.ceil((actual.reinicioEn - ahora) / 1000));

  return { permitido: actual.intentos <= maxIntentos, esperaSegundos };
}

/** Identifica al solicitante detrás del proxy de Vercel. */
export function identificarCliente(headers: Headers): string {
  const reenviado = headers.get("x-forwarded-for");
  if (reenviado) return reenviado.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "desconocido";
}
