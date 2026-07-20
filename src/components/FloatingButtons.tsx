"use client";

import { LAD_WHATSAPP_LINK } from "@/lib/contact";
import { IconCatalog, IconWhatsApp } from "@/components/LadIcons";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const FIXED_PHONE = "714 142 4621";

export default function FloatingButtons() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTeaserVisible, setIsTeaserVisible] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsContactOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsTeaserVisible(true), 1600);
    return () => clearTimeout(showTimer);
  }, []);

  const openContact = () => {
    setIsContactOpen(true);
    setIsTeaserVisible(false);
  };

  return (
    <>
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            className="pointer-events-none fixed inset-x-4 bottom-24 z-[110] sm:inset-y-4 sm:left-auto sm:right-24 sm:flex sm:w-[320px] sm:items-center"
          >
            <motion.div
              role="dialog"
              aria-modal="false"
              aria-labelledby="whatsapp-contact-title"
              variants={{
                closed: { opacity: 0, scale: 0.4, y: 40 },
                open: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 380, damping: 22, mass: 0.7 }}
              className="pointer-events-auto relative flex w-full origin-bottom-right max-h-[calc(100dvh-7rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/25 ring-1 ring-black/5 sm:max-h-[calc(100dvh-2rem)]"
            >
              {/* Header */}
              <div className="flex items-start gap-3 bg-gradient-to-br from-[#25D366] to-[#128C7E] px-5 py-4">
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-base font-black text-white ring-2 ring-white/40">
                  E
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#128C7E] bg-[#7CFC9C]" />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h2 id="whatsapp-contact-title" className="font-display text-base font-black leading-snug text-white">
                    Elena
                  </h2>
                  <p className="text-xs text-white/80">Suele contestar en minutos</p>
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
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#e8ded1] bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[size:16px_16px] px-4 pb-4 pt-4">
                <div className="rounded-xl rounded-tl-sm bg-white px-3.5 py-3 shadow-sm">
                  <p className="text-xs font-bold text-[#128C7E]">Elena</p>
                  <p className="mt-1 text-sm leading-relaxed text-lad-black">¡Hola! 👋</p>
                  <p className="text-sm leading-relaxed text-lad-black">¿En qué podemos ayudarte?</p>
                </div>

                <dl className="mt-3 space-y-2.5 rounded-xl bg-white/70 px-4 py-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="font-bold text-lad-black">Nuestro número</dt>
                    <dd className="text-gray-600">129</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-black/5 pt-2.5">
                    <dt className="font-bold text-lad-black">Recepción</dt>
                    <dd>
                      <a href="tel:+527222913027" className="font-semibold tracking-wide text-[#128C7E] hover:text-[#0b6f62]">
                        722 291 3027
                      </a>
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 border-t border-black/5 pt-2.5">
                    <dt className="font-bold text-lad-black">Tel. fijos</dt>
                    <dd>
                      <a href="tel:+527141424621" className="font-semibold tracking-wide text-[#128C7E] hover:text-[#0b6f62]">
                        {FIXED_PHONE}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="shrink-0 border-t border-black/5 bg-white px-4 pb-4 pt-3.5">
                <a
                  href={LAD_WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1fbd5b] focus:outline-none focus:ring-2 focus:ring-[#128C7E] focus:ring-offset-2"
                >
                  <IconWhatsApp className="h-5 w-5" />
                  Iniciar chat
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bocadillo — invita a iniciar el chat */}
      <AnimatePresence>
        {isTeaserVisible && !teaserDismissed && !isContactOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 500, damping: 18, mass: 0.6 }}
            className="fixed bottom-24 right-24 z-[100] hidden w-[210px] origin-bottom-right sm:block"
          >
            <button
              type="button"
              onClick={openContact}
              className="relative block w-full rounded-2xl bg-white px-4 py-3 text-left text-sm font-bold text-lad-black shadow-xl shadow-black/15 ring-1 ring-black/5 transition hover:-translate-y-0.5"
            >
              ¿En qué podemos ayudarte?
              <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-white" />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setTeaserDismissed(true);
                setIsTeaserVisible(false);
              }}
              aria-label="Cerrar mensaje"
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-lad-black text-[10px] text-white shadow-md"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón WhatsApp — esquina inferior derecha */}
      <button
        type="button"
        onClick={() => (isContactOpen ? setIsContactOpen(false) : openContact())}
        aria-label="Contactar por WhatsApp"
        aria-expanded={isContactOpen}
        className="group fixed bottom-6 right-5 z-[100] flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 shadow-lg shadow-[#128C7E]/25 transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#128C7E] focus:ring-offset-2"
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
