// Validación compartida entre el formulario y el route handler.

// Eden acepta hasta 80 caracteres en el folio (accession_number) y también un
// UUID propio. Permitimos letras, números y los separadores que usa el
// laboratorio: guion, guion bajo, punto y diagonal.
const FOLIO_VALIDO = /^[A-Za-z0-9][A-Za-z0-9._/-]{2,79}$/;

export const FOLIO_LARGO_MAXIMO = 80;

export function normalizarFolio(valor: string): string {
  return valor.trim().replace(/\s+/g, "");
}

export function esFolioValido(valor: string): boolean {
  return FOLIO_VALIDO.test(normalizarFolio(valor));
}

const FECHA_ISO = /^\d{4}-\d{2}-\d{2}$/;

export function esFechaValida(valor: string): boolean {
  if (!FECHA_ISO.test(valor)) return false;
  const fecha = new Date(`${valor}T00:00:00Z`);
  return !Number.isNaN(fecha.getTime()) && fecha.getTime() <= Date.now();
}
