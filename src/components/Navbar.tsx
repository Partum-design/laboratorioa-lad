"use client";

import { IconChip } from "@/components/IconBadge";
import { IconMapPin, IconSearch } from "@/components/LadIcons";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/estudios", label: "Estudios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
  { href: "/unete", label: "Vacantes" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(logoRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8 });
    }
    if (navRef.current) {
      gsap.fromTo(
        navRef.current.querySelectorAll(".nav-item"),
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.3 },
      );
    }
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const textColor = "text-lad-black";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen ? "border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav ref={navRef} className="container-lad flex h-20 items-center justify-between sm:h-24 lg:h-28">
        <div ref={logoRef} className="-ml-3 sm:-ml-5 lg:-ml-8">
          <Link href="/" className="group flex items-center gap-2">
            <Image
              src="/logo/logo-lad.png"
              alt="LAD Logo"
              width={112}
              height={112}
              className="brand-mark h-20 w-20 object-contain transition group-hover:scale-95 sm:h-24 sm:w-24 lg:h-28 lg:w-28"
            />
            <div className={`text-center transition-colors ${textColor}`}>
              <p className="font-display text-sm font-black uppercase leading-none tracking-wider">Laboratorio de</p>
              <p className="mt-0.5 text-xs font-light leading-none opacity-70">Apoyo y Diagnóstico</p>
            </div>
          </Link>
        </div>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="nav-item">
                <Link
                  href={link.href}
                  className={`relative pb-1 text-sm font-semibold uppercase tracking-wide transition ${
                    isActive ? "text-lad-red" : "text-lad-black hover:text-lad-red"
                  }`}
                >
                  {link.label}
                  {isActive && <motion.span layoutId="nav-underline" className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-lad-red" />}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/contacto#sucursales"
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-lad-black/60 transition hover:text-lad-red"
          >
            <IconMapPin className="h-3.5 w-3.5" />
            Sucursales
          </Link>
          <Link
            href="/acceder#consulta"
            className={`flex items-center gap-2.5 border-2 border-lad-red bg-lad-red px-6 py-3 text-sm font-bold tracking-wider text-white shadow-md shadow-lad-red/30 transition hover:border-lad-red-dark hover:bg-lad-red-dark hover:shadow-lg hover:shadow-lad-red/40 ${
              pathname === "/acceder" ? "ring-2 ring-white/60 ring-offset-2" : ""
            } ${scrolled ? "ring-offset-white" : "ring-offset-transparent"}`}
          >
            <IconChip color="currentColor" size="h-5 w-5"><IconSearch /></IconChip>
            Mis resultados
          </Link>
        </div>

        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen((value) => !value)}
          className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden ${textColor}`}
        >
          <span className={`h-0.5 w-6 bg-current transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-current transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 bg-white md:hidden"
          >
            <div className="container-lad flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-4 text-sm font-bold uppercase tracking-wider ${pathname === link.href ? "text-lad-red" : "text-lad-black"}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contacto#sucursales"
                className="flex items-center gap-2 py-4 text-xs font-semibold uppercase tracking-wide text-lad-black/60"
              >
                <IconMapPin className="h-3.5 w-3.5" />
                Sucursales
              </Link>
              <Link
                href="/acceder#consulta"
                className="mt-2 flex items-center justify-center gap-2.5 border-2 border-lad-red bg-lad-red py-4 text-base font-bold tracking-wider text-white shadow-md shadow-lad-red/30"
              >
                <IconChip color="currentColor" size="h-5 w-5"><IconSearch /></IconChip>
                Consultar mis resultados
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
