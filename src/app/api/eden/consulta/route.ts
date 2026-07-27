import { NextResponse } from "next/server";

import { obtenerOrdenPorFolio, obtenerUrlVisor } from "@/lib/eden/client";
import { getEdenConfig } from "@/lib/eden/config";
import { esFechaValida, esFolioValido, normalizarFolio } from "@/lib/eden/folio";
import { consumirIntento, identificarCliente } from "@/lib/eden/limite";
import { coincideFechaNacimiento, presentarEstudio } from "@/lib/eden/presentar";
import type { ConsultaRespuesta } from "@/lib/eden/types";

export const runtime = "nodejs";
// Cada consulta debe golpear a Eden en vivo: nada de caché ni prerender.
export const dynamic = "force-dynamic";

function responder(cuerpo: ConsultaRespuesta, estado: number) {
  return NextResponse.json(cuerpo, {
    status: estado,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  const config = getEdenConfig();
  if (!config) {
    return responder(
      {
        ok: false,
        codigo: "no_configurado",
        mensaje: "La consulta en línea no está disponible por el momento. Comunícate con nosotros para recibir tus resultados.",
      },
      503,
    );
  }

  const limite = consumirIntento(identificarCliente(request.headers));
  if (!limite.permitido) {
    return responder(
      {
        ok: false,
        codigo: "limite_excedido",
        mensaje: `Demasiadas consultas seguidas. Vuelve a intentar en ${limite.esperaSegundos} segundos.`,
      },
      429,
    );
  }

  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    cuerpo = null;
  }

  const datos = (cuerpo ?? {}) as { folio?: unknown; fechaNacimiento?: unknown };
  const folio = typeof datos.folio === "string" ? normalizarFolio(datos.folio) : "";
  const fechaNacimiento = typeof datos.fechaNacimiento === "string" ? datos.fechaNacimiento.trim() : "";

  if (!esFolioValido(folio)) {
    return responder(
      {
        ok: false,
        codigo: "folio_invalido",
        mensaje: "Revisa el folio: debe tener al menos 3 caracteres y sólo letras, números o guiones.",
      },
      400,
    );
  }

  if (config.requireBirthDate && !esFechaValida(fechaNacimiento)) {
    return responder(
      {
        ok: false,
        codigo: "verificacion_fallida",
        mensaje: "Captura la fecha de nacimiento del paciente para poder mostrar el estudio.",
      },
      400,
    );
  }

  const resultado = await obtenerOrdenPorFolio(folio);

  if (resultado.estado === "sin_configurar") {
    return responder(
      {
        ok: false,
        codigo: "no_configurado",
        mensaje: "La consulta en línea no está disponible por el momento.",
      },
      503,
    );
  }

  if (resultado.estado === "error") {
    console.error(`[eden] Error consultando el folio: ${resultado.detalle}`);
    return responder(
      {
        ok: false,
        codigo: "servicio_no_disponible",
        mensaje: "No pudimos conectar con el sistema de resultados. Inténtalo de nuevo en unos minutos.",
      },
      502,
    );
  }

  if (resultado.estado === "no_encontrado") {
    return responder(
      {
        ok: false,
        codigo: "no_encontrado",
        mensaje: "No encontramos ningún estudio con ese folio. Verifícalo en tu comprobante o comunícate con nosotros.",
      },
      404,
    );
  }

  const orden = resultado.valor;

  // Cuando el segundo factor está activo, una fecha equivocada responde igual
  // que un folio inexistente para no confirmar que el folio existe.
  if (config.requireBirthDate && !coincideFechaNacimiento(orden, fechaNacimiento)) {
    return responder(
      {
        ok: false,
        codigo: "no_encontrado",
        mensaje: "No encontramos ningún estudio con esos datos. Verifica el folio y la fecha de nacimiento.",
      },
      404,
    );
  }

  // El visor firmado sólo se pide si la orden no trae ya el enlace público.
  const visorFirmado = orden.public_study_viewer_link ? null : await obtenerUrlVisor(folio);

  return responder({ ok: true, estudio: presentarEstudio(orden, visorFirmado) }, 200);
}

export function GET() {
  return NextResponse.json(
    { ok: false, codigo: "folio_invalido", mensaje: "Usa POST para consultar un folio." },
    { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" } },
  );
}
