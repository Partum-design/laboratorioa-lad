"use client";

import {
  LAD_ADDRESS_DISPLAY,
  LAD_MAPS_LINK,
  LAD_PHONE_DISPLAY,
  LAD_TEL_LINK,
  LAD_WHATSAPP_LINK,
} from "@/lib/contact";
import { edenPortals } from "@/lib/eden-portals";
import { EdenMark } from "@/components/EdenBrand";
import { IconFacebook, IconMapPin } from "@/components/LadIcons";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/estudios#catalogo", label: "Estudios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto#agenda", label: "Contacto" },
  { href: "/unete#vacantes", label: "Vacantes" },
  { href: "/acceder#consulta", label: "Consultar mis resultados" },
];

const LAD_FACEBOOK_LINK = "https://www.facebook.com/LADTenancingo";

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
                <p className="font-display text-sm font-black uppercase tracking-wider">Laboratorio de</p>
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
            <a
              href={LAD_FACEBOOK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de LAD Tenancingo"
              className="group inline-flex h-10 w-10 items-center justify-center border border-gray-800 text-gray-300 transition hover:border-lad-red hover:text-lad-red"
            >
              <IconFacebook className="h-4 w-4" />
            </a>
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
              <li className="flex items-start gap-2 text-gray-400">
                <IconMapPin className="mt-0.5 h-4 w-4 flex-none text-lad-red" />
                <span>{LAD_ADDRESS_DISPLAY}</span>
              </li>
              <li>
                <a
                  href={LAD_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border border-lad-red/60 bg-lad-red/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-lad-red"
                >
                  <IconMapPin className="h-4 w-4" />
                  Ver sucursal en Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-gray-400">
              Portal del personal — Ecosistema eden
            </h4>
            <Link href="/acceder#personal" className="text-xs font-bold uppercase tracking-widest text-lad-red transition hover:text-white">
              Ver todos los accesos →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {edenPortals.map((portal) => (
              <a
                key={portal.slug}
                href={portal.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-gray-800 px-3 py-3 transition hover:border-lad-red"
              >
                <EdenMark suffix={portal.suffix} size="h-3.5 w-3.5" textClassName="text-xs text-gray-300 group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} LAD Laboratorio de Apoyo y Diagnóstico. Todos los derechos reservados.
          </p>
          <a
            href="https://partumdesign.com.mx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-600 transition hover:text-lad-red"
          >
            Partum Design
          </a>
        </div>
      </div>
    </footer>
  );
}
