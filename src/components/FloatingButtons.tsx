"use client";

import { LAD_WHATSAPP_LINK } from "@/lib/contact";
import Link from "next/link";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconCatalog() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path fillRule="evenodd" d="M6.75 2.25A2.25 2.25 0 0 0 4.5 4.5v15a2.25 2.25 0 0 0 2.25 2.25h10.5A2.25 2.25 0 0 0 19.5 19.5V4.5a2.25 2.25 0 0 0-2.25-2.25H15a.75.75 0 0 0-.75.75v.75a1.5 1.5 0 0 1-1.5 1.5h-1.5a1.5 1.5 0 0 1-1.5-1.5V3a.75.75 0 0 0-.75-.75H6.75ZM8.25 12a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5H9Zm-.75-4.5a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
    </svg>
  );
}

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
        <WhatsAppIcon />
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
        <IconCatalog />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold text-white transition-all duration-300 group-hover:max-w-xs">
          Ver estudios
        </span>
      </Link>
    </>
  );
}
