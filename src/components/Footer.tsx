"use client";

import Link from "next/link";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/estudios", label: "Estudios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
  { href: "/unete", label: "Unete al equipo" },
];

export default function Footer() {
  return (
    <footer className="bg-lad-black text-white">
      <div className="container-lad py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center bg-lad-red">
                <span className="font-display text-base font-black text-white">LAD</span>
              </div>
              <div>
                <p className="font-display text-sm font-black uppercase tracking-wider">Laboratorio</p>
                <p className="mt-0.5 text-xs font-light opacity-60">Apoyo y Diagnostico</p>
              </div>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              Precision que genera confianza, resultados que importan. Certificados ISO 9001:2015.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-lad-red" />
              <span className="text-xs font-semibold uppercase tracking-widest text-lad-red">ISO 9001:2015</span>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-display text-sm font-bold uppercase tracking-widest text-gray-400">Navegacion</h4>
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
              <li>Direccion del laboratorio, Ciudad</li>
              <li>+52 (000) 000-0000</li>
              <li>contacto@lad.com.mx</li>
              <li>Lun-Vie: 7:00am - 6:00pm<br />Sab: 7:00am - 2:00pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} LAD Laboratorio de Apoyo y Diagnostico. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-600">Hecho por Partum Design</p>
        </div>
      </div>
    </footer>
  );
}
