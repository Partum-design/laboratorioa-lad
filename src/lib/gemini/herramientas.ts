import "server-only";

import { estudios } from "@/app/estudios/estudios-data";
import { obtenerOrdenPorFolio, obtenerUrlVisor } from "@/lib/eden/client";
import { isBirthDateRequired } from "@/lib/eden/config";
import { coincideFechaNacimiento, presentarEstudio, presentarSoloVisor } from "@/lib/eden/presentar";
import { esFolioValido, normalizarFolio } from "@/lib/eden/folio";
import { buildWhatsAppLink } from "@/lib/contact";

// Declaraciones que Gemini ve para decidir cuándo llamar cada función. El
// texto de "description" es la única guía que tiene el modelo, así que debe
// ser preciso sobre cuándo usarla y qué no puede inventar.
export const declaracionesDeFunciones = [
  {
    name: "buscar_estudios",
    description:
      "Busca en el catálogo real de estudios de LAD por nombre o categoría y regresa nombre, precio, categoría e indicación de preparación. Úsala siempre antes de mencionar un precio o confirmar que un estudio existe: nunca inventes precios ni nombres de estudios.",
    parameters: {
      type: "OBJECT",
      properties: {
        consulta: { type: "STRING", description: "Palabra o frase para buscar en el nombre del estudio, ej. 'biometria hematica' o 'tiroides'." },
      },
      required: ["consulta"],
    },
  },
  {
    name: "consultar_folio",
    description:
      "Consulta en vivo, contra el sistema del laboratorio, el avance de un estudio por su folio o ID. Úsala cuando el paciente pregunte por el estado de sus resultados y te dé un folio.",
    parameters: {
      type: "OBJECT",
      properties: {
        folio: { type: "STRING", description: "Folio o ID del estudio, tal como lo escribió el paciente." },
        fechaNacimiento: { type: "STRING", description: "Fecha de nacimiento del paciente en formato YYYY-MM-DD, sólo si el paciente ya la dio." },
      },
      required: ["folio"],
    },
  },
  {
    name: "navegar",
    description:
      "Manda al paciente a una sección del sitio en su navegador. Úsala para llevarlo directo a pagar un estudio (con /pago-en-linea?estudio=NOMBRE&precio=MONTO), al catálogo completo, a consultar resultados o a agendar. No la uses para nada fuera de estas rutas.",
    parameters: {
      type: "OBJECT",
      properties: {
        ruta: {
          type: "STRING",
          description:
            "Ruta interna a la que navegar, ej. '/pago-en-linea?estudio=BIOMETRIA%20HEMATICA&precio=275', '/estudios#catalogo', '/acceder#consulta', '/contacto#agenda'.",
        },
        motivo: { type: "STRING", description: "Explicación breve de por qué lo mandas ahí, para mostrarla junto al botón." },
      },
      required: ["ruta"],
    },
  },
  {
    name: "transferir_a_humano",
    description:
      "Abre WhatsApp con el equipo de LAD para que un humano continúe la conversación. Úsala si el paciente lo pide, si la pregunta no es sobre estudios/precios/resultados/pagos de LAD, si involucra interpretar un resultado clínico, una queja, o si no tienes al menos 85% de certeza de tu respuesta.",
    parameters: {
      type: "OBJECT",
      properties: {
        motivo: { type: "STRING", description: "Resumen breve, en primera persona del paciente, de lo que necesita. Se usa como mensaje inicial de WhatsApp." },
      },
      required: ["motivo"],
    },
  },
];

export type AccionChat =
  | { type: "navigate"; href: string; motivo?: string }
  | { type: "handoff"; href: string; motivo: string };

const RUTAS_PERMITIDAS = ["/", "/estudios", "/acceder", "/pago-en-linea", "/contacto", "/nosotros", "/unete"];

function rutaValida(ruta: string): boolean {
  if (!ruta.startsWith("/")) return false;
  const [ruta_sin_hash] = ruta.split("#");
  const [ruta_base] = ruta_sin_hash.split("?");
  return RUTAS_PERMITIDAS.includes(ruta_base);
}

// El paciente (y el modelo) suele escribir sin acentos ("biometria"), pero el
// catálogo los lleva ("BIOMETRÍA"). Sin normalizar, la búsqueda falla, el
// modelo reintenta con otra variante y se acaban las vueltas del loop.
function normalizarTexto(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function buscarEstudios(consulta: string) {
  const q = normalizarTexto((consulta ?? "").trim());
  if (!q) return { resultados: [] };

  const coincidencias = estudios
    .filter((e) => normalizarTexto(e.nombre).includes(q) || normalizarTexto(e.cat).includes(q))
    .slice(0, 8)
    .map((e) => ({ nombre: e.nombre, categoria: e.cat, precio: e.precio, indicacion: e.indicacion }));

  return { resultados: coincidencias, total_en_catalogo: estudios.length };
}

async function consultarFolio(folio: string, fechaNacimiento?: string) {
  const folioLimpio = normalizarFolio(folio ?? "");
  if (!esFolioValido(folioLimpio)) {
    return { ok: false, mensaje: "Ese folio no parece válido; pide al paciente que lo revise en su comprobante." };
  }

  const requiereFecha = isBirthDateRequired();
  if (requiereFecha && !fechaNacimiento) {
    return { ok: false, mensaje: "Falta la fecha de nacimiento del paciente para poder consultar; pídesela primero." };
  }

  const resultado = await obtenerOrdenPorFolio(folioLimpio);

  if (resultado.estado === "sin_configurar") return { ok: false, mensaje: "La consulta en vivo no está disponible ahora; transfiere a un humano." };
  if (resultado.estado === "limitado") return { ok: false, mensaje: "El sistema está saturado por el momento; pide al paciente que intente en unos minutos o transfiere a un humano." };
  if (resultado.estado === "error") return { ok: false, mensaje: "No se pudo conectar con el sistema del laboratorio; transfiere a un humano." };

  if (resultado.estado === "no_encontrado") {
    if (!requiereFecha) {
      const visor = await obtenerUrlVisor(folioLimpio);
      if (visor.estado === "ok") {
        const publico = presentarSoloVisor(visor.valor.identificador, visor.valor.url);
        return { ok: true, estudio: publico };
      }
    }
    return { ok: false, mensaje: "No se encontró ningún estudio con ese folio. Pide al paciente que lo verifique." };
  }

  const orden = resultado.valor;
  if (requiereFecha && fechaNacimiento && !coincideFechaNacimiento(orden, fechaNacimiento)) {
    return { ok: false, mensaje: "El folio no coincide con esa fecha de nacimiento. No confirmes si existe o no el folio." };
  }

  const publico = presentarEstudio(orden, null);
  return { ok: true, estudio: publico };
}

/**
 * Ejecuta la función que Gemini pidió. Las de navegación no hacen nada en el
 * servidor: sólo se valida la ruta y se agrega a `acciones` para que el
 * widget del navegador la ejecute.
 */
export async function ejecutarFuncion(
  nombre: string,
  args: Record<string, unknown>,
  acciones: AccionChat[],
): Promise<Record<string, unknown>> {
  switch (nombre) {
    case "buscar_estudios":
      return buscarEstudios(String(args.consulta ?? ""));

    case "consultar_folio":
      return consultarFolio(String(args.folio ?? ""), args.fechaNacimiento ? String(args.fechaNacimiento) : undefined);

    case "navegar": {
      const ruta = String(args.ruta ?? "");
      if (!rutaValida(ruta)) return { ok: false, mensaje: "Ruta no permitida." };
      acciones.push({ type: "navigate", href: ruta, motivo: args.motivo ? String(args.motivo) : undefined });
      return { ok: true };
    }

    case "transferir_a_humano": {
      const motivo = String(args.motivo ?? "Hola, necesito ayuda de LAD.");
      acciones.push({ type: "handoff", href: buildWhatsAppLink(motivo), motivo });
      return { ok: true };
    }

    default:
      return { ok: false, mensaje: `Función desconocida: ${nombre}` };
  }
}
