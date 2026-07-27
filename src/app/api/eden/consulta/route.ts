import { NextResponse } from "next/server";

import { obtenerOrdenPorFolio, obtenerUrlVisor } from "@/lib/eden/client";
import { getEdenConfig } from "@/lib/eden/config";
import { esFechaValida, esFolioValido, normalizarFolio } from "@/lib/eden/folio";
import { consumirIntento, identificarCliente } from "@/lib/eden/limite";
import { coincideFechaNacimiento, presentarEstudio, presentarSoloVisor } from "@/lib/eden/presentar";
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

  // Eden limita las peticiones por token, así que este tope lo comparten todos
  // los visitantes del sitio, no sólo quien está consultando.
  if (resultado.estado === "limitado") {
    return responder(
      {
        ok: false,
        codigo: "limite_excedido",
        mensaje: "El sistema de resultados está recibiendo muchas consultas. Espera un minuto y vuelve a intentar.",
      },
      429,
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
    // Un estudio cargado directo en el PACS ("Upload study") no genera orden en
    // Eden Management, así que `/orders/` no lo conoce. Todavía podemos
    // localizarlo por el identificador que el PACS muestra como "ID".
    // El segundo factor no aplica aquí: sin orden no hay fecha de nacimiento
    // contra la cual comparar, así que en ese modo no revelamos el estudio.
    if (!config.requireBirthDate) {
      const visor = await obtenerUrlVisor(folio);

      if (visor.estado === "limitado") {
        return responder(
          {
            ok: false,
            codigo: "limite_excedido",
            mensaje: "El sistema de resultados está recibiendo muchas consultas. Espera un minuto y vuelve a intentar.",
          },
          429,
        );
      }

      if (visor.estado === "ok") {
        return responder({ ok: true, estudio: presentarSoloVisor(visor.valor.identificador, visor.valor.url) }, 200);
      }
    }

    return responder(
      {
        ok: false,
        codigo: "no_encontrado",
        mensaje: "No encontramos ningún estudio con ese folio o ID. Verifícalo en tu comprobante o comunícate con nosotros.",
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

  // El visor firmado cuesta peticiones extra contra una cuota muy ajustada, así
  // que sólo se pide cuando hace falta: si la orden ya trae el enlace público no
  // hay nada que resolver, y si todavía no hay estudio en el PACS no hay
  // imágenes que mostrar.
  const faltaVisor = !orden.public_study_viewer_link && Boolean(orden.pacs_study);
  const visorFirmado = faltaVisor ? await obtenerUrlVisor(folio) : null;
  const urlVisor = visorFirmado?.estado === "ok" ? visorFirmado.valor.url : null;

  return responder({ ok: true, estudio: presentarEstudio(orden, urlVisor) }, 200);
}

export function GET() {
  return NextResponse.json(
    { ok: false, codigo: "folio_invalido", mensaje: "Usa POST para consultar un folio." },
    { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" } },
  );
}
