"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { IconChatBot, IconSend, IconSparkles, IconWhatsApp } from "@/components/LadIcons";

type Accion =
  | { type: "navigate"; href: string; motivo?: string }
  | { type: "handoff"; href: string; motivo: string };

interface Mensaje {
  rol: "usuario" | "asistente";
  texto: string;
  acciones?: Accion[];
}

const SALUDO_INICIAL: Mensaje = {
  rol: "asistente",
  texto: "Hola, soy el asistente de LAD. Puedo ayudarte a ver precios de estudios, llevarte a pagar en línea o consultar tus resultados. ¿Qué necesitas?",
};

function ActionButton({ accion, onNavigate }: { accion: Accion; onNavigate: (href: string) => void }) {
  if (accion.type === "handoff") {
    return (
      <a
        href={accion.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 flex w-fit items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-2 text-xs font-bold text-white transition hover:bg-[#1ebe5a]"
      >
        <IconWhatsApp className="h-4 w-4" />
        Hablar con alguien de LAD
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onNavigate(accion.href)}
      className="mt-2 flex w-fit items-center gap-2 rounded-full bg-lad-red px-3.5 py-2 text-xs font-bold text-white transition hover:bg-lad-red-dark"
    >
      Ir ahora →
    </button>
  );
}

export default function ChatbotWidget() {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([SALUDO_INICIAL]);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const finRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mensajes, abierto]);

  function irA(href: string) {
    setAbierto(false);
    router.push(href);
  }

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    const mensaje = texto.trim();
    if (!mensaje || enviando) return;

    const historial = mensajes
      .filter((m) => m !== SALUDO_INICIAL)
      .map((m) => ({ rol: m.rol, texto: m.texto }));

    setMensajes((actual) => [...actual, { rol: "usuario", texto: mensaje }]);
    setTexto("");
    setEnviando(true);

    try {
      const respuesta = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje, historial }),
      });
      const datos = await respuesta.json();

      setMensajes((actual) => [
        ...actual,
        { rol: "asistente", texto: datos.respuesta ?? "No pude responder eso.", acciones: datos.acciones },
      ]);
    } catch {
      setMensajes((actual) => [
        ...actual,
        { rol: "asistente", texto: "No pude conectar con el asistente. Intenta de nuevo en un momento." },
      ]);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {abierto && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97, transition: { duration: 0.15 } }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-title"
            className="fixed bottom-24 right-4 z-[110] flex h-[min(32rem,calc(100dvh-8rem))] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.4rem] bg-white shadow-[0_24px_80px_-24px_rgba(0,0,0,0.55)] ring-1 ring-black/10 sm:right-6"
          >
            <div className="relative overflow-hidden border-b border-black/5 bg-lad-gray-light px-5 py-4">
              <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-lad-red/20 blur-2xl" />
              <div className="relative flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lad-red text-white">
                  <IconSparkles className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 id="chatbot-title" className="font-display text-sm font-black leading-snug text-lad-black">
                    Asistente LAD
                  </h2>
                  <p className="text-[11px] text-lad-black/60">Estudios, precios, pagos y resultados</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAbierto(false)}
                  aria-label="Cerrar asistente"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/5 text-lg text-lad-black/80 transition hover:bg-black/10"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-lad-gray-light px-4 py-4">
              {mensajes.map((mensaje, indice) => (
                <div key={indice} className={`flex ${mensaje.rol === "usuario" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      mensaje.rol === "usuario" ? "rounded-tr-sm bg-lad-red text-white" : "rounded-tl-sm bg-white text-lad-black shadow-[0_1px_2px_rgba(11,20,26,0.12)]"
                    }`}
                  >
                    {mensaje.texto}
                    {mensaje.acciones?.map((accion, i) => (
                      <ActionButton key={i} accion={accion} onNavigate={irA} />
                    ))}
                  </div>
                </div>
              ))}
              {enviando && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 text-sm text-gray-400 shadow-[0_1px_2px_rgba(11,20,26,0.12)]">
                    Escribiendo…
                  </div>
                </div>
              )}
              <div ref={finRef} />
            </div>

            <form onSubmit={enviar} className="flex shrink-0 items-center gap-2 border-t border-black/5 bg-white px-3 py-3">
              <input
                value={texto}
                onChange={(evento) => setTexto(evento.target.value)}
                placeholder="Escribe tu pregunta…"
                className="min-w-0 flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-lad-red"
              />
              <button
                type="submit"
                disabled={enviando || !texto.trim()}
                aria-label="Enviar"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lad-red text-white transition hover:bg-lad-red-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                <IconSend className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-label="Abrir asistente de LAD"
        aria-expanded={abierto}
        className="group fixed bottom-8 right-4 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-lad-black shadow-[0_10px_28px_-8px_rgba(32,30,30,0.85)] transition-all duration-300 hover:scale-110 hover:bg-lad-red focus:outline-none focus:ring-2 focus:ring-lad-red focus:ring-offset-2 active:scale-95 sm:right-6 sm:h-16 sm:w-16"
      >
        <IconChatBot className="h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8" />
      </button>
    </>
  );
}
