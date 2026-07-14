"use client";

import { LAD_WHATSAPP_LINK } from "@/lib/contact";
import { IconCatalog, IconWhatsApp } from "@/components/LadIcons";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const FIXED_PHONE = "7 14 14 2 46 21";

export default function FloatingButtons() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsContactOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-labelledby="whatsapp-contact-title"
            initial={{ opacity: 0, scale: 0.92, x: 16 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.92, x: 16 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 left-4 z-[110] origin-bottom-right sm:bottom-auto sm:left-auto sm:right-24 sm:top-1/2 sm:w-[320px] sm:-translate-y-1/2"
          >
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/25 ring-1 ring-black/5">
              {/* Header */}
              <div className="flex items-start gap-3 bg-gradient-to-br from-[#25D366] to-[#128C7E] px-5 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white ring-2 ring-white/40">
                  <IconWhatsApp className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Atención LAD</p>
                  <h2 id="whatsapp-contact-title" className="font-display text-base font-black leading-snug text-white">
                    ¿En qué puedo servirte?
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsContactOpen(false)}
                  aria-label="Cerrar información de contacto"
                  className="-mr-1 -mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg text-white/90 transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
                >
                  ×
                </button>
              </div>

              {/* Body */}
              <div className="px-5 py-4">
                <p className="text-sm leading-relaxed text-gray-600">
                  Te atiende <strong className="text-lad-black">Elena</strong>, tu asesora personal.
                </p>

                <dl className="mt-4 space-y-2.5 rounded-xl bg-lad-gray-light/70 px-4 py-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="font-bold text-lad-black">Nuestro número</dt>
                    <dd className="text-gray-600">129</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-black/5 pt-2.5">
                    <dt className="font-bold text-lad-black">Recepción</dt>
                    <dd>
                      <a href="tel:+527222913027" className="text-[#128C7E] underline decoration-[#25D366] underline-offset-2 hover:text-[#0b6f62]">
                        722 291 3027
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-black/5 pt-2.5">
                    <dt className="font-bold text-lad-black">Tel. fijos</dt>
                    <dd>
                      <a href="tel:+527141424621" className="text-[#128C7E] underline decoration-[#25D366] underline-offset-2 hover:text-[#0b6f62]">
                        {FIXED_PHONE}
                      </a>
                    </dd>
                  </div>
                </dl>

                <a
                  href={LAD_WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1fbd5b] focus:outline-none focus:ring-2 focus:ring-[#128C7E] focus:ring-offset-2"
                >
                  <IconWhatsApp className="h-5 w-5" />
                  Escribir por WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón WhatsApp — centro derecha */}
      <button
        type="button"
        onClick={() => setIsContactOpen((open) => !open)}
        aria-label="Contactar por WhatsApp"
        aria-expanded={isContactOpen}
        className="group fixed right-5 top-1/2 z-[100] flex -translate-y-1/2 items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 shadow-lg shadow-[#128C7E]/25 transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#128C7E] focus:ring-offset-2"
      >
        <motion.span
          animate={isContactOpen ? {} : { rotate: [0, -8, 8, -8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
        >
          <IconWhatsApp className="h-6 w-6" />
        </motion.span>
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold text-white transition-all duration-300 group-hover:max-w-xs sm:block">
          WhatsApp
        </span>
      </button>

      {/* Botón Ver Estudios — izquierda */}
      <Link
        href="/estudios#catalogo"
        aria-label="Ver catálogo de estudios"
        className="group fixed bottom-8 left-6 z-[100] flex items-center gap-3 rounded-full bg-lad-red px-4 py-3 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      >
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <IconCatalog />
        </motion.span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold text-white transition-all duration-300 group-hover:max-w-xs">
          Ver estudios
        </span>
      </Link>
    </>
  );
}
