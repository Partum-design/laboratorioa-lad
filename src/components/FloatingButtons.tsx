"use client";

import { LAD_PHONE_DISPLAY, LAD_TEL_LINK, LAD_WHATSAPP_LINK, LAD_WHATSAPP_MESSAGE } from "@/lib/contact";
import { IconCatalog, IconPhoneModern, IconWhatsApp } from "@/components/LadIcons";
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={() => setIsContactOpen(false)}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-[#071b14]/20 p-3 backdrop-blur-[2px] sm:justify-start sm:p-4 sm:pl-24"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="whatsapp-contact-title"
              initial={{ opacity: 0, x: -36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative flex h-[min(36rem,calc(100dvh-1.5rem))] w-full max-w-[calc(100vw-1.5rem)] origin-center flex-col overflow-hidden rounded-[1.4rem] bg-white shadow-[0_24px_80px_-24px_rgba(0,0,0,0.55)] ring-1 ring-black/10 sm:w-[360px] sm:max-w-[calc(100vw-6rem)] sm:origin-left"
            >
              {/* Header */}
              <div className="relative overflow-hidden bg-[#075E54] px-5 py-5">
                <div className="absolute -right-10 -top-14 h-40 w-40 rounded-full border-[18px] border-white/10" />
                <div className="absolute -bottom-20 -left-10 h-36 w-36 rounded-full bg-[#25D366]/30 blur-2xl" />
                <div className="relative flex items-start gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 ring-2 ring-white/25">
                    <IconWhatsApp className="h-7 w-7" />
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/70">Atención LAD</p>
                    <h2 id="whatsapp-contact-title" className="mt-1 font-display text-base font-black leading-snug text-white">
                      Escríbenos por WhatsApp
                    </h2>
                    <p className="mt-1 text-xs text-white/80">Te orientamos en pocos minutos</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsContactOpen(false)}
                  aria-label="Cerrar información de contacto"
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-lg leading-none text-white/90 transition hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-white/60"
                >
                  ×
                </button>
              </div>

              {/* Body */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#ECE5DD] px-4 pb-4 pt-5">
                <p className="mb-3 px-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#075E54]">Estamos para ayudarte</p>
                {/* Burbuja entrante, como en un chat de WhatsApp */}
                <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(11,20,26,0.16)]">
                  <p className="text-sm font-bold text-lad-black">¡Hola! 👋</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">Cuéntanos qué necesitas y te ayudamos a encontrar el siguiente paso.</p>
                </div>

                <dl className="mt-3 space-y-2.5 rounded-2xl bg-white px-4 py-3 text-sm shadow-[0_1px_2px_rgba(11,20,26,0.16)]">
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

                {/* Burbuja saliente: adelanta el mensaje que se enviará */}
                <div className="ml-8 mt-3 rounded-2xl rounded-tr-sm bg-[#DCF8C6] px-4 py-2.5 shadow-[0_1px_2px_rgba(11,20,26,0.16)]">
                  <p className="text-sm leading-relaxed text-[#111b21]">{LAD_WHATSAPP_MESSAGE}</p>
                  <p className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-[#667781]">
                    Listo para enviar
                    <span aria-hidden="true" className="text-[#34B7F1]">✓✓</span>
                  </p>
                </div>
              </div>

              <div className="shrink-0 border-t border-black/5 bg-white px-4 pb-4 pt-3.5">
                <a
                  href={LAD_WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-between gap-3 rounded-2xl bg-[#25D366] px-4 py-3 text-white shadow-lg shadow-[#25D366]/25 transition hover:bg-[#1DA851] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#25D366] shadow-sm">
                      <IconWhatsApp className="h-5 w-5" />
                    </span>
                    <span className="text-left">
                      <span className="block text-sm font-black">Iniciar conversación</span>
                      <span className="block text-[10px] font-medium text-white/70">Abrir WhatsApp</span>
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">→</span>
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
            className="fixed bottom-24 left-[6.5rem] z-[100] hidden w-[220px] origin-left sm:block sm:bottom-28"
          >
            <button
              type="button"
              onClick={openContact}
              className="relative block w-full rounded-[1.15rem] border-l-4 border-lad-red bg-white px-4 py-3.5 text-left text-sm font-bold text-lad-black shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] ring-1 ring-black/5 transition hover:-translate-y-0.5"
            >
              <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.2em] text-lad-red">Atención LAD</span>
              ¿Necesitas orientación?
              <span className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-white" />
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

      {/* Botón WhatsApp — marca oficial en círculo, sin texto */}
      <button
        type="button"
        onClick={() => (isContactOpen ? setIsContactOpen(false) : openContact())}
        aria-label="Contactar por WhatsApp"
        aria-expanded={isContactOpen}
        className="group fixed bottom-24 left-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_28px_-8px_rgba(37,211,102,0.85)] transition-all duration-300 hover:scale-110 hover:bg-[#1DA851] hover:shadow-[0_14px_34px_-8px_rgba(37,211,102,0.95)] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 active:scale-95 sm:bottom-28 sm:h-16 sm:w-16"
      >
        {/* Halo que late hacia afuera del círculo */}
        <motion.span
          aria-hidden="true"
          animate={isContactOpen ? { opacity: 0, scale: 1 } : { opacity: [0.45, 0], scale: [1, 1.75] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]"
        />
        <IconWhatsApp className="relative z-10 h-8 w-8 text-white transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9" />
      </button>

      {/* Botón Llamar ahora — círculo alineado con WhatsApp y Ver estudios */}
      <a
        href={LAD_TEL_LINK}
        aria-label={`Llamar ahora al ${LAD_PHONE_DISPLAY}`}
        className="group fixed bottom-44 left-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-lad-black shadow-[0_10px_28px_-8px_rgba(0,0,0,0.55)] transition-all duration-300 hover:scale-110 hover:bg-lad-red hover:shadow-[0_14px_34px_-8px_rgba(228,75,20,0.55)] focus:outline-none focus:ring-2 focus:ring-lad-red focus:ring-offset-2 active:scale-95 sm:bottom-52 sm:h-16 sm:w-16"
      >
        <IconPhoneModern className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110 sm:h-7 sm:w-7" />
      </a>

      {/* Botón Ver Estudios — izquierda */}
      <Link
        href="/estudios#catalogo"
        aria-label="Ver catálogo de estudios"
        className="group fixed bottom-8 left-6 z-[100] flex items-center rounded-full bg-lad-red px-4 py-3 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      >
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <IconCatalog />
        </motion.span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap pl-0 text-sm font-bold text-white transition-all duration-300 group-hover:max-w-xs group-hover:pl-3">
          Ver estudios
        </span>
      </Link>
    </>
  );
}
