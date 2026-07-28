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

/**
 * Los documentos se abren en una pestaña nueva, así que un error aquí lo lee el
 * paciente directamente: si respondiéramos JSON vería `{"ok":false,...}` en
 * pantalla. Cuando la petición viene de una navegación del navegador se le
 * contesta una página; el JSON se conserva para cualquier consumo programático.
 */
function error(mensaje: string, estado: number, request?: Request) {
  const esNavegador = (request?.headers.get("accept") ?? "").includes("text/html");

  if (!esNavegador) {
    return NextResponse.json({ ok: false, mensaje }, { status: estado, headers: { "Cache-Control": "no-store" } });
  }

  const escapado = mensaje.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] as string);
  const pagina = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Documento no disponible</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;padding:2rem;
font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#f8fafc;color:#0f172a}
main{max-width:32rem;text-align:center}h1{font-size:1.25rem;margin:0 0 .75rem}
p{margin:0;color:#475569;line-height:1.6}</style></head>
<body><main><h1>${escapado}</h1>
<p>Puedes cerrar esta pestaña y volver a intentarlo más tarde, o comunicarte con el laboratorio para recibir tu documento.</p>
</main></body></html>`;

  return new NextResponse(pagina, {
    status: estado,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}

/**
 * Entrega el PDF resolviendo la URL en el servidor. Así el navegador nunca ve
 * el enlace interno de Eden y cada descarga pasa por el mismo control de
 * acceso que la consulta.
 */
export async function GET(request: Request) {
  const config = getEdenConfig();
  if (!config) return error("La descarga de documentos no está disponible.", 503, request);

  const limite = consumirIntento(identificarCliente(request.headers));
  if (!limite.permitido) return error("Demasiadas descargas seguidas. Espera un momento.", 429, request);

  const parametros = new URL(request.url).searchParams;
  const folio = normalizarFolio(parametros.get("folio") ?? "");
  const tipo = (parametros.get("tipo") ?? "reporte") as DocumentoTipo;
  const fechaNacimiento = (parametros.get("fechaNacimiento") ?? "").trim();

  if (!esFolioValido(folio)) return error("Folio inválido.", 400, request);
  if (!TIPOS.includes(tipo)) return error("Tipo de documento no soportado.", 400, request);
  if (config.requireBirthDate && !esFechaValida(fechaNacimiento)) {
    return error("Falta la verificación de la fecha de nacimiento.", 400, request);
  }

  const resultado = await obtenerOrdenPorFolio(folio);
  if (resultado.estado === "limitado") {
    return error("El sistema está recibiendo muchas consultas. Espera un minuto y vuelve a intentar.", 429, request);
  }

  if (resultado.estado !== "ok") {
    return error("No encontramos el documento solicitado.", resultado.estado === "error" ? 502 : 404, request);
  }

  const orden = resultado.valor;
  if (config.requireBirthDate && !coincideFechaNacimiento(orden, fechaNacimiento)) {
    return error("No encontramos el documento solicitado.", 404, request);
  }

  const destino = tipo === "reporte" ? urlReporte(orden) : urlOrden(orden);
  if (!destino) return error("Este documento todavía no está disponible.", 404, request);

  // Los PDF suelen vivir en almacenamiento firmado (sin auth), pero cuando el
  // enlace apunta al propio middleware hay que reenviar el token.
  let mismoHost = false;
  try {
    mismoHost = new URL(destino).host === new URL(config.baseUrl).host;
  } catch {
    return error("El documento no está disponible.", 502, request);
  }

  const archivo = await fetch(destino, {
    headers: mismoHost ? { Authorization: `Token ${config.token}` } : {},
    cache: "no-store",
  });

  if (!archivo.ok || !archivo.body) {
    console.error(`[eden] No se pudo descargar el documento (${archivo.status})`);
    return error("No pudimos recuperar el documento. Inténtalo más tarde.", 502, request);
  }

  // Cuando el PDF todavía no existe, `files.evacenter.com` no responde 404:
  // redirige con 302 al portal interno de Eden, que contesta 200 con el HTML de
  // su aplicación. Verificado en producción. Sin esta comprobación le
  // entregaríamos al paciente esa página renombrada como .pdf — y ese destino
  // lleva credenciales del personal en el parámetro `ac=`, así que además de
  // inútil sería una fuga. Lo tratamos como documento no disponible.
  const tipoContenido = archivo.headers.get("content-type") ?? "";
  if (!tipoContenido.toLowerCase().includes("pdf")) {
    console.error(`[eden] El documento no es un PDF (content-type: ${tipoContenido || "sin declarar"})`);
    return error("Este documento todavía no está disponible.", 404, request);
  }

  const nombre = `${tipo === "reporte" ? "resultados" : "orden"}-${folio.replace(/[^A-Za-z0-9._-]/g, "_")}.pdf`;

  return new NextResponse(archivo.body, {
    status: 200,
    headers: {
      "Content-Type": tipoContenido,
      "Content-Disposition": `inline; filename="${nombre}"`,
      "Cache-Control": "no-store",
    },
  });
}
