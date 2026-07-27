import { NextResponse } from "next/server";

import { obtenerOrdenPorFolio } from "@/lib/eden/client";
import { getEdenConfig } from "@/lib/eden/config";
import { esFechaValida, esFolioValido, normalizarFolio } from "@/lib/eden/folio";
import { consumirIntento, identificarCliente } from "@/lib/eden/limite";
import { coincideFechaNacimiento, urlOrden, urlReporte } from "@/lib/eden/presentar";
import type { DocumentoTipo } from "@/lib/eden/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TIPOS: DocumentoTipo[] = ["reporte", "orden"];

function error(mensaje: string, estado: number) {
  return NextResponse.json({ ok: false, mensaje }, { status: estado, headers: { "Cache-Control": "no-store" } });
}

/**
 * Entrega el PDF resolviendo la URL en el servidor. Así el navegador nunca ve
 * el enlace interno de Eden y cada descarga pasa por el mismo control de
 * acceso que la consulta.
 */
export async function GET(request: Request) {
  const config = getEdenConfig();
  if (!config) return error("La descarga de documentos no está disponible.", 503);

  const limite = consumirIntento(identificarCliente(request.headers));
  if (!limite.permitido) return error("Demasiadas descargas seguidas. Espera un momento.", 429);

  const parametros = new URL(request.url).searchParams;
  const folio = normalizarFolio(parametros.get("folio") ?? "");
  const tipo = (parametros.get("tipo") ?? "reporte") as DocumentoTipo;
  const fechaNacimiento = (parametros.get("fechaNacimiento") ?? "").trim();

  if (!esFolioValido(folio)) return error("Folio inválido.", 400);
  if (!TIPOS.includes(tipo)) return error("Tipo de documento no soportado.", 400);
  if (config.requireBirthDate && !esFechaValida(fechaNacimiento)) {
    return error("Falta la verificación de la fecha de nacimiento.", 400);
  }

  const resultado = await obtenerOrdenPorFolio(folio);
  if (resultado.estado === "limitado") {
    return error("El sistema está recibiendo muchas consultas. Espera un minuto y vuelve a intentar.", 429);
  }

  if (resultado.estado !== "ok") {
    return error("No encontramos el documento solicitado.", resultado.estado === "error" ? 502 : 404);
  }

  const orden = resultado.valor;
  if (config.requireBirthDate && !coincideFechaNacimiento(orden, fechaNacimiento)) {
    return error("No encontramos el documento solicitado.", 404);
  }

  const destino = tipo === "reporte" ? urlReporte(orden) : urlOrden(orden);
  if (!destino) return error("Este documento todavía no está disponible.", 404);

  // Los PDF suelen vivir en almacenamiento firmado (sin auth), pero cuando el
  // enlace apunta al propio middleware hay que reenviar el token.
  let mismoHost = false;
  try {
    mismoHost = new URL(destino).host === new URL(config.baseUrl).host;
  } catch {
    return error("El documento no está disponible.", 502);
  }

  const archivo = await fetch(destino, {
    headers: mismoHost ? { Authorization: `Token ${config.token}` } : {},
    cache: "no-store",
  });

  if (!archivo.ok || !archivo.body) {
    console.error(`[eden] No se pudo descargar el documento (${archivo.status})`);
    return error("No pudimos recuperar el documento. Inténtalo más tarde.", 502);
  }

  const nombre = `${tipo === "reporte" ? "resultados" : "orden"}-${folio.replace(/[^A-Za-z0-9._-]/g, "_")}.pdf`;

  return new NextResponse(archivo.body, {
    status: 200,
    headers: {
      "Content-Type": archivo.headers.get("content-type") ?? "application/pdf",
      "Content-Disposition": `inline; filename="${nombre}"`,
      "Cache-Control": "no-store",
    },
  });
}
