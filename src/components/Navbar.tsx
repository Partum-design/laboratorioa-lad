"use client";

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
  { href: "/unete", label: "Únete" },
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

  const textColor = scrolled || menuOpen ? "text-lad-black" : "text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen ? "border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav ref={navRef} className="container-lad flex h-20 items-center justify-between">
        <div ref={logoRef}>
          <Link href="/" className="group flex items-center gap-2">
            <Image
              src="/logo/logo-lad.png"
              alt="LAD Logo"
              width={52}
              height={52}
              className="object-contain transition group-hover:scale-95 drop-shadow"
            />
            <div className={`transition-colors ${textColor}`}>
              <p className="font-display text-sm font-black uppercase leading-none tracking-wider">Laboratorio</p>
              <p className="mt-0.5 text-xs font-light leading-none opacity-70">Apoyo y Diagnostico</p>
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
                    isActive ? "text-lad-red" : scrolled ? "text-lad-black hover:text-lad-red" : "text-white hover:text-red-200"
                  }`}
                >
                  {link.label}
                  {isActive && <motion.span layoutId="nav-underline" className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-lad-red" />}
                </Link>
              </li>
            );
          })}
        </ul>

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
