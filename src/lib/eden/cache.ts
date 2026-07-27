import "server-only";

import type { EdenOrder } from "@/lib/eden/types";

// Eden limita a ~10 peticiones por minuto **por token**, es decir para todo el
// sitio a la vez (medido contra staging). Por eso no se cachea la búsqueda de
// cada paciente sino el listado completo de cada ventana de fechas: la primera
// consulta del minuto lo trae y todas las demás se resuelven en memoria, sin
// volver a molestar a Eden.
//
// Es un caché de proceso: en Vercel vive por instancia y se pierde en cada
// arranque en frío, que para datos clínicos es lo deseable.
const VIGENCIA_MS = 60_000;
const MAX_VENTANAS = 24;

interface Entrada {
  ordenes: EdenOrder[];
  expiraEn: number;
}

const memoria = new Map<string, Entrada>();

export function leerVentana(clave: string): EdenOrder[] | null {
  const entrada = memoria.get(clave);
  if (!entrada) return null;

  if (entrada.expiraEn <= Date.now()) {
    memoria.delete(clave);
    return null;
  }

  return entrada.ordenes;
}

export function guardarVentana(clave: string, ordenes: EdenOrder[]): void {
  if (memoria.size >= MAX_VENTANAS) {
    const ahora = Date.now();
    const vencidas: string[] = [];
    memoria.forEach((entrada, k) => {
      if (entrada.expiraEn <= ahora) vencidas.push(k);
    });
    vencidas.forEach((k) => memoria.delete(k));

    if (memoria.size >= MAX_VENTANAS) {
      const primera = memoria.keys().next();
      if (!primera.done) memoria.delete(primera.value);
    }
  }

  memoria.set(clave, { ordenes, expiraEn: Date.now() + VIGENCIA_MS });
}
