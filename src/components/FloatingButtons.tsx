"use client";

import { LAD_WHATSAPP_LINK } from "@/lib/contact";
import { IconCatalog, IconWhatsApp } from "@/components/LadIcons";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const FIXED_PHONE = "7 14 14 2 46 21";

export default function FloatingButtons() {
  const [isContactOpen, setIsContactOpen] = useState(true);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsContactOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      {isContactOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="whatsapp-contact-title"
          className="fixed left-4 right-4 top-1/2 z-[110] -translate-y-1/2 sm:left-auto sm:right-24 sm:w-[min(360px,calc(100vw-7rem))]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-2xl shadow-black/20">
            <div className="absolute inset-x-0 top-0 h-1 bg-[#25D366]" />
            <button
              type="button"
              onClick={() => setIsContactOpen(false)}
              aria-label="Cerrar información de contacto"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-xl text-gray-400 transition hover:bg-gray-100 hover:text-lad-black focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            >
              ×
            </button>
            <div className="mb-4 flex items-center gap-3 pr-8">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#128C7E]">
                <IconWhatsApp className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#128C7E]">Atención LAD</p>
                <h2 id="whatsapp-contact-title" className="font-display text-xl font-black leading-tight text-lad-black">
                  ¿En qué puedo servirte?
                </h2>
              </div>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              Te atiende <strong className="text-lad-black">Elena, tu asesora personal.</strong>
            </p>
            <div className="space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600">
              <p><span className="font-bold text-lad-black">Nuestro número:</span> 129</p>
              <div>
                <p className="mb-1 font-bold text-lad-black">Teléfono de recepción</p>
                <a href="tel:+527222913027" className="text-[#128C7E] underline decoration-[#25D366] underline-offset-2 hover:text-[#0b6f62]">722 291 3027</a>
              </div>
              <div>
                <p className="mb-1 font-bold text-lad-black">Teléfonos fijos</p>
                <a href="tel:+527141424621" className="text-[#128C7E] underline decoration-[#25D366] underline-offset-2 hover:text-[#0b6f62]">{FIXED_PHONE}</a>
              </div>
            </div>
            <a
              href={LAD_WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1fbd5b] focus:outline-none focus:ring-2 focus:ring-[#128C7E] focus:ring-offset-2"
            >
              <IconWhatsApp className="h-5 w-5" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Botón WhatsApp — centro derecha */}
      <a
        href={LAD_WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="group fixed right-5 top-1/2 z-[100] flex -translate-y-1/2 items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 shadow-lg shadow-[#128C7E]/25 transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#128C7E] focus:ring-offset-2"
      >
        <motion.span
          animate={{ rotate: [0, -8, 8, -8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
        >
          <IconWhatsApp className="h-6 w-6" />
        </motion.span>
        <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold text-white transition-all duration-300 group-hover:max-w-xs sm:block">
          WhatsApp
        </span>
      </a>

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
