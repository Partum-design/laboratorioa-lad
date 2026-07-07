"use client";

import { LAD_WHATSAPP_LINK } from "@/lib/contact";
import { IconCatalog, IconWhatsApp } from "@/components/LadIcons";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FloatingButtons() {
  return (
    <>
      {/* Botón WhatsApp — derecha */}
      <a
        href={LAD_WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="group fixed bottom-8 right-6 z-[100] flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      >
        <motion.span
          animate={{ rotate: [0, -8, 8, -8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
        >
          <IconWhatsApp className="h-6 w-6" />
        </motion.span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold text-white transition-all duration-300 group-hover:max-w-xs">
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
