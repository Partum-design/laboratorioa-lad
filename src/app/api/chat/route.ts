import { NextResponse } from "next/server";

import { buildWhatsAppLink } from "@/lib/contact";
import { getGeminiApiKey, urlGenerateContent } from "@/lib/gemini/config";
import { declaracionesDeFunciones, ejecutarFuncion, type AccionChat } from "@/lib/gemini/herramientas";
import { consumirIntento, identificarCliente } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MENSAJE_INICIAL = "Hola, tengo una duda y me gustaría hablar con alguien de LAD.";

const SYSTEM_PROMPT = `Eres el asistente virtual de LAD (Laboratorio de Apoyo y Diagnóstico), un laboratorio clínico y de imagenología en el Estado de México.

Reglas estrictas, en este orden de prioridad:
1. Sólo hablas de: estudios y precios de LAD, preparación para un estudio, consulta de resultados por folio, pago en línea, sucursales y horarios, y agendar citas.
2. Nunca inventes un precio, nombre de estudio o dato de una orden: todo precio o dato de folio sale exclusivamente de las funciones "buscar_estudios" y "consultar_folio". Si esas funciones no traen el dato, dilo tal cual y no lo completes con suposiciones.
3. Nunca interpretes clínicamente un resultado (qué significa un valor, si es normal o grave, qué hacer al respecto): eso lo hace un médico. Si te lo piden, usa "transferir_a_humano".
4. Nunca pidas ni proceses número de tarjeta, CVV, contraseñas o datos bancarios en el chat. El pago con tarjeta sólo ocurre en la página /pago-en-linea, a la que puedes mandar al paciente con "navegar".
5. Si el paciente quiere pagar un estudio, primero identifica cuál con "buscar_estudios" y luego usa "navegar" hacia "/pago-en-linea?estudio=<nombre>&precio=<monto sin signos>". Si quiere ver el catálogo completo, navega a "/estudios#catalogo". Si quiere ver el estado de sus resultados, usa "consultar_folio"; si prefiere ir él mismo, navega a "/acceder#consulta". Si quiere agendar, navega a "/contacto#agenda".
6. Si la pregunta se sale de tu alcance, si el paciente está molesto, pide hablar con una persona, o no tienes al menos 85% de certeza de tu respuesta, usa "transferir_a_humano" con un resumen breve de lo que necesita, en vez de adivinar.
7. Responde siempre en español de México, en 1 a 4 oraciones, cálido pero directo, sin tecnicismos innecesarios y sin emojis de más.`;

interface CuerpoEntrada {
  mensaje?: unknown;
  historial?: unknown;
}

interface TurnoHistorial {
  rol: "usuario" | "asistente";
  texto: string;
}

function limpiarHistorial(valor: unknown): TurnoHistorial[] {
  if (!Array.isArray(valor)) return [];
  return valor
    .filter((item): item is TurnoHistorial => {
      const registro = item as Record<string, unknown>;
      return (
        !!registro &&
        (registro.rol === "usuario" || registro.rol === "asistente") &&
        typeof registro.texto === "string"
      );
    })
    .slice(-12)
    .map((item) => ({ rol: item.rol, texto: item.texto.slice(0, 2000) }));
}

async function llamarGemini(apiKey: string, contents: unknown[]) {
  const respuesta = await fetch(`${urlGenerateContent()}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      tools: [{ functionDeclarations: declaracionesDeFunciones }],
      generationConfig: { temperature: 0.2, topP: 0.8, maxOutputTokens: 500 },
    }),
  });

  if (!respuesta.ok) {
    const texto = await respuesta.text();
    throw new Error(`Gemini respondió ${respuesta.status}: ${texto.slice(0, 300)}`);
  }

  return respuesta.json();
}

export async function POST(request: Request) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, respuesta: "El asistente no está disponible por el momento.", acciones: [] },
      { status: 503 },
    );
  }

  const limite = consumirIntento("chat", identificarCliente(request.headers), 20);
  if (!limite.permitido) {
    return NextResponse.json(
      { ok: false, respuesta: `Estás mandando muchos mensajes seguidos. Espera ${limite.esperaSegundos} segundos.`, acciones: [] },
      { status: 429 },
    );
  }

  let cuerpo: CuerpoEntrada;
  try {
    cuerpo = (await request.json()) as CuerpoEntrada;
  } catch {
    return NextResponse.json({ ok: false, respuesta: "No entendí tu mensaje.", acciones: [] }, { status: 400 });
  }

  const mensaje = typeof cuerpo.mensaje === "string" ? cuerpo.mensaje.trim().slice(0, 2000) : "";
  if (!mensaje) {
    return NextResponse.json({ ok: false, respuesta: "Escribe tu pregunta y con gusto te ayudo.", acciones: [] }, { status: 400 });
  }

  const historial = limpiarHistorial(cuerpo.historial);

  const contents: unknown[] = [
    ...historial.map((turno) => ({
      role: turno.rol === "usuario" ? "user" : "model",
      parts: [{ text: turno.texto }],
    })),
    { role: "user", parts: [{ text: mensaje }] },
  ];

  const acciones: AccionChat[] = [];

  try {
    for (let intento = 0; intento < 5; intento += 1) {
      const datos = await llamarGemini(apiKey, contents);
      const candidato = datos.candidates?.[0];
      const partes: Array<Record<string, unknown>> = candidato?.content?.parts ?? [];

      if (!candidato || partes.length === 0) {
        return NextResponse.json({
          ok: true,
          respuesta: "No pude procesar eso. ¿Puedes escribirlo de otra forma, o prefieres hablar con alguien de LAD?",
          acciones: [{ type: "handoff", href: buildFallbackHandoff(), motivo: MENSAJE_INICIAL }],
        });
      }

      const llamadasFuncion = partes.filter((parte) => parte.functionCall);

      if (llamadasFuncion.length === 0) {
        const texto = partes.map((parte) => (typeof parte.text === "string" ? parte.text : "")).join(" ").trim();
        return NextResponse.json({ ok: true, respuesta: texto || "Cuéntame un poco más y te ayudo.", acciones });
      }

      contents.push(candidato.content);

      const partesRespuesta = [];
      for (const parte of llamadasFuncion) {
        const llamada = parte.functionCall as { name: string; args?: Record<string, unknown>; id?: string };
        const resultado = await ejecutarFuncion(llamada.name, llamada.args ?? {}, acciones);
        partesRespuesta.push({
          functionResponse: { name: llamada.name, id: llamada.id, response: resultado },
        });
      }
      contents.push({ role: "user", parts: partesRespuesta });
    }

    return NextResponse.json({
      ok: true,
      respuesta: "Mejor te comunico con alguien de LAD para resolver esto bien.",
      acciones: [...acciones, { type: "handoff", href: buildFallbackHandoff(), motivo: MENSAJE_INICIAL }],
    });
  } catch (error) {
    console.error("[chat] Error consultando a Gemini:", error);
    return NextResponse.json(
      {
        ok: true,
        respuesta: "Tuve un problema para responder. Escríbenos por WhatsApp y te ayudamos de inmediato.",
        acciones: [{ type: "handoff", href: buildFallbackHandoff(), motivo: MENSAJE_INICIAL }],
      },
      { status: 200 },
    );
  }
}

function buildFallbackHandoff(): string {
  return buildWhatsAppLink(MENSAJE_INICIAL);
}

export function GET() {
  return NextResponse.json(
    { ok: false, respuesta: "Usa POST para hablar con el asistente." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
