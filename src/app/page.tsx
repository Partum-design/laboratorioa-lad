"use client";

import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { TestimonialsSection } from "@/components/ui/TestimonialsColumns";
import { IconBadge, IconChip } from "@/components/IconBadge";
import {
  IconCheck,
  IconClock,
  IconCreditCard,
  IconFocus,
  IconPackage,
  IconPhone,
  IconResults,
  IconShieldCheck,
  IconTestTubes,
  IconUsers,
} from "@/components/LadIcons";
import { iconColorAt } from "@/lib/icon-palette";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoAuto from "@/components/VideoAuto";
import { LAD_METEPEC_MAPS_LINK, LAD_WHATSAPP_LINK } from "@/lib/contact";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: "40+", label: "Años de experiencia", icon: <IconClock /> },
  { value: "500+", label: "Estudios disponibles", icon: <IconTestTubes /> },
  { value: "ISO", label: "Sistema de calidad", icon: <IconShieldCheck /> },
  { value: "Digital", label: "Resultados disponibles", icon: <IconResults /> },
];

const servicios = [
  { icon: <IconTestTubes />, title: "Análisis clínicos", desc: "Desde un estudio de rutina hasta pruebas especializadas, siempre bajo procesos certificados.", href: "/estudios#catalogo", cta: "Ver catálogo" },
  { icon: <IconPackage />, title: "Paquetes preventivos", desc: "Perfiles ya armados para chequeos generales, empresas y el seguimiento de tu familia.", href: "/estudios#paquetes", cta: "Ver paquetes" },
  { icon: <IconPhone />, title: "Atención directa", desc: "Agenda, pregunta lo que necesites y sigue tus resultados, directo por WhatsApp.", href: "/contacto#agenda", cta: "Agendar cita" },
];

const valores = [
  { icon: <IconFocus />, title: "Criterio clínico", desc: "Ningún resultado sale sin que alguien lo revise con calma primero." },
  { icon: <IconUsers />, title: "Trato humano", desc: "Te decimos los pasos, los tiempos y qué llevar, sin tecnicismos de más." },
  { icon: <IconShieldCheck />, title: "Privacidad", desc: "Tus datos y resultados quedan bajo acceso controlado. Punto." },
  { icon: <IconCheck />, title: "Calidad ISO", desc: "Operamos bajo un sistema de gestión ISO 9001:2015." },
];

const rutasRapidas = [
  { title: "Quiero hacerme un estudio", desc: "Consulta pruebas, tiempos de entrega y tipo de muestra.", href: "/estudios#catalogo" },
  { title: "Busco un chequeo preventivo", desc: "Elige un paquete y agenda por WhatsApp.", href: "/estudios#paquetes" },
  { title: "Necesito una cita", desc: "Déjanos tus datos o escríbenos directo.", href: "/contacto#agenda" },
  { title: "Quiero trabajar en LAD", desc: "Revisa vacantes y envía tu postulación.", href: "/unete#vacantes" },
];

const heroTitles = ["precisos", "confiables", "certificados", "inmediatos", "claros"];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<HTMLSpanElement[]>([]);
  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === heroTitles.length - 1 ? 0 : prev + 1));
    }, 2400);
    return () => clearTimeout(timeoutId);
  }, [titleNumber]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.to(heroRef.current.querySelector(".hero-bg"), {
          yPercent: 16,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (statsRef.current) {
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            counterRefs.current.forEach((el) => {
              const target = el.dataset.target || "0";
              const suffix = target.replace(/[0-9]/g, "");
              const num = Number.parseInt(target, 10);
              if (Number.isNaN(num)) {
                el.textContent = target;
                return;
              }
              gsap.fromTo(
                el,
                { textContent: "0" },
                {
                  textContent: num,
                  duration: 1.8,
                  snap: { textContent: 1 },
                  onUpdate: () => {
                    el.textContent = `${Math.round(Number(el.textContent))}${suffix}`;
                  },
                },
              );
            });
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section ref={heroRef} className="relative flex h-screen min-h-[680px] items-center justify-center overflow-hidden text-center">
        <div className="hero-bg absolute inset-0 -top-10">
          <Image src="/img/lad-hero-laboratorio.png" alt="Equipo automatizado en un laboratorio clínico" fill priority className="object-cover opacity-35 mix-blend-luminosity" />
          <div className="hero-dark absolute inset-0" />
          <div className="hero-noise absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-lad-black via-transparent to-lad-black/40" />
        </div>

        <div className="container-lad relative z-10">
          <div className="mx-auto max-w-3xl">
            {/* Nueva sucursal Metepec */}
            <motion.div
              initial={{ opacity: 0, y: -28, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-6 flex w-full flex-col items-center"
            >
              <span className="absolute inset-0 -z-10 rounded-full bg-lad-red/50 blur-2xl animate-pulse" />
              <a
                href={LAD_METEPEC_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex max-w-full flex-col items-center gap-1 rounded-full border-2 border-lad-red bg-lad-red px-9 py-3.5 shadow-[0_0_50px_rgba(228,75,20,0.6)] transition hover:bg-lad-red-dark sm:flex-row sm:gap-2 sm:px-5 sm:py-2.5 md:gap-2.5 md:px-7 md:py-3 lg:gap-3 lg:px-10 lg:py-3.5"
              >
                <span className="whitespace-nowrap text-[11px] font-black uppercase tracking-[0.35em] text-white/90 sm:text-[9px] sm:tracking-[0.22em] md:text-[10px] md:tracking-[0.28em] lg:text-[11px] lg:tracking-[0.35em]">Nueva sucursal</span>
                <span className="hidden h-4 w-px bg-white/30 sm:block" />
                <span className="whitespace-nowrap font-display text-2xl font-black uppercase leading-none tracking-tight text-white sm:text-lg md:text-xl lg:text-3xl">
                  LAD<span className="align-super text-[9px] sm:text-[10px] md:text-xs lg:text-sm">®</span> Metepec
                </span>
              </a>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mx-auto mb-8 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-lad-red animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Precisión diagnóstica</span>
            </motion.div>

            {/* Animated heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-8 font-display text-6xl font-black leading-none tracking-tight text-white md:text-7xl lg:text-8xl"
            >
              Resultados
              <span
                className="relative flex w-full justify-center py-1 text-lad-red md:py-2"
                style={{ clipPath: "inset(0 -500px)" }}
              >
                &nbsp;
                {heroTitles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-black whitespace-nowrap"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-300"
            >
              Análisis clínicos, paquetes preventivos y el seguimiento de tus resultados. Procesos certificados y gente que sí se toma el tiempo de explicarte.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/estudios#catalogo" className="btn-primary">Ver estudios</Link>
              <a href={LAD_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-white">
                Agendar por WhatsApp
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5 text-white/30"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <div ref={statsRef} className="bg-lad-red py-10">
        <div className="container-lad grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center text-white">
              <IconBadge color="#ffffff" iconColor={iconColorAt(index)} className="h-11 w-11 rounded-full">
                {stat.icon}
              </IconBadge>
              <span ref={(el) => { if (el) counterRefs.current[index] = el; }} data-target={stat.value} className="block font-display text-4xl font-black md:text-5xl">
                {stat.value}
              </span>
              <span className="text-sm text-red-100">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pago en línea */}
      <section className="bg-lad-red">
        <div className="container-lad flex flex-col items-center gap-4 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <IconChip color="#ffffff" size="h-6 w-6"><IconCreditCard /></IconChip>
            <p className="font-display text-lg font-bold text-white sm:text-xl">
              Paga en línea y obtén un descuento especial.
            </p>
          </div>
          <Link href="/pago-en-linea" className="btn-white shrink-0">
            Quiero pagar en línea
          </Link>
        </div>
      </section>

      {/* Servicios */}
      <section className="section-padding bg-white">
        <div className="container-lad">
          <ScrollReveal>
            <div className="mb-16 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Nuestros servicios</p>
              <h2 className="heading-lg">Lo que hacemos <span className="text-lad-red">por ti</span></h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {servicios.map((servicio, index) => (
              <ScrollReveal key={servicio.title} delay={index * 0.12}>
                <div className="card-hover group border border-gray-100 bg-white p-8 hover:border-lad-red">
                  <IconBadge color={iconColorAt(index)} className="mb-6 h-14 w-14">
                    {servicio.icon}
                  </IconBadge>
                  <h3 className="heading-md mb-3 text-lad-black">{servicio.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{servicio.desc}</p>
                  <Link href={servicio.href} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-lad-red">
                    {servicio.cta}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quiénes somos */}
      <section className="section-padding bg-lad-gray-light">
        <div className="container-lad grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="video-frame group relative aspect-[4/3] w-full lg:aspect-auto lg:h-[480px]">
              <VideoAuto
                src="/vids/inicio/quienes-somos-recortado.mp4"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
              <div className="absolute bottom-6 right-6 rounded-xl bg-lad-red p-6 text-center text-white shadow-lg shadow-lad-red/30">
                <p className="font-display text-3xl font-black">40+</p>
                <p className="text-xs">años de experiencia</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Quiénes somos</p>
              <h2 className="heading-lg">Resultados que llegan claros, <span className="text-lad-red">sin vueltas</span></h2>
              <p className="body-lg">Pacientes, médicos y empresas vuelven con nosotros por lo mismo: entregamos claro, tratamos bien y nuestra calidad se puede medir.</p>
              <Link href="/nosotros" className="btn-outline inline-flex items-center gap-2">
                Conoce LAD
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Rutas rápidas */}
      <section className="section-padding bg-lad-gray-light text-lad-black">
        <div className="container-lad">
          <ScrollReveal>
            <div className="mb-12 max-w-2xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Accesos rápidos</p>
              <h2 className="heading-lg">Ve directo a lo que necesitas</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {rutasRapidas.map((ruta, index) => (
              <ScrollReveal key={ruta.title} delay={index * 0.08}>
                <Link href={ruta.href} className="group flex h-full flex-col justify-between border border-black/10 bg-white p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-lad-red hover:shadow-lg">
                  <span className="mb-8 block h-1 w-10 bg-lad-red transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-16" />
                  <span>
                    <span className="block font-display text-lg font-bold text-lad-black transition-colors duration-300 group-hover:text-lad-red">{ruta.title}</span>
                    <span className="mt-3 block text-sm leading-relaxed text-gray-600">{ruta.desc}</span>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <TestimonialsSection />

      {/* Valores */}
      <section className="section-padding bg-white">
        <div className="container-lad">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Por qué elegirnos</p>
              <h2 className="heading-lg">Nuestros <span className="text-lad-red">valores</span></h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {valores.map((valor, index) => (
              <ScrollReveal key={valor.title} delay={index * 0.1}>
                <div className="group h-full border-l-4 border-lad-red bg-lad-gray-light p-6 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:bg-white hover:shadow-xl">
                  <IconBadge color={iconColorAt(index)} className="mb-4 h-10 w-10">
                    {valor.icon}
                  </IconBadge>
                  <h3 className="mb-2 font-display text-xl font-bold">{valor.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{valor.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
