"use client";

import {
  LAD_MAPS_LINK,
  LAD_PHONE_DISPLAY,
  LAD_SUCURSALES,
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
    <footer className="bg-lad-gray-light text-lad-black">
      <div className="container-lad py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo/logo-lad.png"
                alt="LAD Logo"
                width={60}
                height={60}
                className="brand-mark object-contain"
              />
              <div>
                <p className="font-display text-sm font-black uppercase tracking-wider">Laboratorio de</p>
                <p className="mt-0.5 text-xs font-light opacity-60">Apoyo y Diagnóstico</p>
              </div>
            </Link>
            <p className="max-w-xs text-justify text-sm leading-relaxed text-lad-black/70">
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
              className="group inline-flex h-10 w-10 items-center justify-center border border-lad-black/15 text-lad-black/60 transition hover:border-lad-red hover:text-lad-red"
            >
              <IconFacebook className="h-4 w-4" />
            </a>
          </div>

          <div>
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-lad-black/60">Navegación</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 text-sm text-lad-black/80 transition hover:text-lad-red">
                    <span className="block h-px w-0 bg-lad-red transition-all group-hover:w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-lad-black/60">Contacto</h4>
            <ul className="space-y-4 text-sm text-lad-black/80">
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
              <li className="border-l-2 border-lad-red pl-3 text-lad-black/60">Rayos X y tomografía: 24/7, los 365 días.</li>
              <li>
                <a
                  href={LAD_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 border border-lad-red/60 bg-lad-red/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-lad-red transition hover:bg-lad-red hover:text-white"
                >
                  <IconMapPin className="h-4 w-4" />
                  Ver sucursal en Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-black/10 pt-8">
          <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-lad-black/60">Nuestras sucursales</h4>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LAD_SUCURSALES.map((sucursal) => (
              <div key={sucursal.slug} className="border border-black/10 bg-white p-4">
                <p className="flex items-start gap-2 text-sm font-bold text-lad-black">
                  <IconMapPin className="mt-0.5 h-4 w-4 flex-none text-lad-red" />
                  {sucursal.nombre}
                </p>
                {sucursal.esMatriz && (
                  <span className="mt-2 inline-block bg-lad-red px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-white">
                    Matriz
                  </span>
                )}
                <p className="mt-2 text-xs leading-relaxed text-lad-black/60">{sucursal.direccion}</p>
                <p className="mt-2 text-xs text-lad-black/50">
                  {sucursal.horario.map((linea) => (
                    <span key={linea} className="block">{linea}</span>
                  ))}
                </p>
                {sucursal.telefonoDisplay && sucursal.telefonoTelLink && (
                  <a href={sucursal.telefonoTelLink} className="mt-2 inline-block text-xs font-semibold text-lad-red transition hover:text-lad-black">
                    {sucursal.telefonoDisplay}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-black/10 pt-8">
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-lad-black/60">
              Portal del personal — Ecosistema eden
            </h4>
            <Link href="/acceder#personal" className="text-xs font-bold uppercase tracking-widest text-lad-red transition hover:text-lad-black">
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
                className="group border border-black/10 bg-white px-3 py-3 transition hover:border-lad-red"
              >
                <EdenMark suffix={portal.suffix} size="h-3.5 w-3.5" textClassName="text-xs text-lad-black/70 group-hover:text-lad-red" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-8 sm:flex-row">
          <p className="text-xs text-lad-black/50">
            © {new Date().getFullYear()} LAD Laboratorio de Apoyo y Diagnóstico. Todos los derechos reservados.
          </p>
          <a
            href="https://partumdesign.com.mx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold uppercase tracking-[0.35em] text-lad-black/40 transition hover:text-lad-red"
          >
            Partum Design
          </a>
        </div>
      </div>
    </footer>
  );
}
