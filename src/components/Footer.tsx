"use client";

import { LAD_PHONE_DISPLAY, LAD_TEL_LINK, LAD_WHATSAPP_LINK } from "@/lib/contact";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/estudios#catalogo", label: "Estudios" },
  { href: "/estudios#paquetes", label: "Paquetes" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto#agenda", label: "Contacto" },
  { href: "/unete#vacantes", label: "Únete al equipo" },
];

export default function Footer() {
  return (
    <footer className="bg-lad-black text-white">
      <div className="container-lad py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo/logo-lad.png"
                alt="LAD Logo"
                width={60}
                height={60}
                className="object-contain drop-shadow"
              />
              <div>
                <p className="font-display text-sm font-black uppercase tracking-wider">Laboratorio</p>
                <p className="mt-0.5 text-xs font-light opacity-60">Apoyo y Diagnóstico</p>
              </div>
            </Link>
            <p className="max-w-xs text-justify text-sm leading-relaxed text-gray-400">
              Diagnóstico clínico con procesos certificados, trato claro y resultados listos para tomar decisiones médicas.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-lad-red" />
              <span className="text-xs font-semibold uppercase tracking-widest text-lad-red">ISO 9001:2015</span>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-gray-400">Navegación</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 text-sm text-gray-300 transition hover:text-lad-red">
                    <span className="block h-px w-0 bg-lad-red transition-all group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-gray-400">Contacto</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li>
                <a href={LAD_TEL_LINK} className="transition hover:text-lad-red">
                  {LAD_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={LAD_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="transition hover:text-lad-red">
                  WhatsApp para citas y dudas
                </a>
              </li>
              <li>Lun a vie: 7:00 am a 6:00 pm<br />Sáb: 7:00 am a 2:00 pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} LAD Laboratorio de Apoyo y Diagnóstico. Todos los derechos reservados.
          </p>
          <p className="text-[10px] uppercase tracking-[0.35em] text-gray-600">Partum Design · Desarrollo en proceso</p>
        </div>
      </div>
    </footer>
  );
}
