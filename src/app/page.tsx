"use client";

import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { TestimonialsSection } from "@/components/ui/TestimonialsColumns";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoAuto from "@/components/VideoAuto";
import { LAD_WHATSAPP_LINK } from "@/lib/contact";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.75 4.5a.75.75 0 0 0-1.5 0V12c0 .284.152.547.398.69l4.5 2.625a.75.75 0 1 0 .755-1.297l-4.153-2.424V6.75Z" clipRule="evenodd" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  );
}
function IconMonitor() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v9.75c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75V5.25a.75.75 0 0 0-.75-.75H4.5a.75.75 0 0 0-.75.75Z" />
    </svg>
  );
}
function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" className="h-5 w-5">
      <path d="M12,12 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0" />
      <path d="M12,12 m-6.5,0 a6.5,6.5 0 1,0 13,0 a6.5,6.5 0 1,0 -13,0" />
      <path d="M12,12 m-2.5,0 a2.5,2.5 0 1,0 5,0 a2.5,2.5 0 1,0 -5,0" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
    </svg>
  );
}
function IconFlask() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
      <path fillRule="evenodd" d="M9.75 2.25a.75.75 0 0 0 0 1.5h.75v3.378a3 3 0 0 1-.405 1.51L5.967 16.5a2.625 2.625 0 0 0 2.273 3.937h7.52a2.625 2.625 0 0 0 2.273-3.937l-4.128-7.862a3 3 0 0 1-.405-1.51V3.75h.75a.75.75 0 0 0 0-1.5h-4.5Zm.75 6.378V3.75h3v4.878a4.5 4.5 0 0 0 .607 2.265l1.282 2.442a23.025 23.025 0 0 0-8.336.49l1.84-3.5a4.5 4.5 0 0 0 .607-2.264Z" clipRule="evenodd" />
    </svg>
  );
}
function IconPackage() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
      <path fillRule="evenodd" d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V9a1.5 1.5 0 0 0 1.5 1.5h18A1.5 1.5 0 0 0 22.5 9V6.375c0-1.036-.84-1.875-1.875-1.875h-17.25ZM3 18.75A1.5 1.5 0 0 1 1.5 17.25V10.5h21v6.75a1.5 1.5 0 0 1-1.5 1.5H3ZM9 12.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H9Z" clipRule="evenodd" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
      <path fillRule="evenodd" d="M1.5 4.5c0-1.036.84-1.875 1.875-1.875h3.375c.621 0 1.125.504 1.125 1.125v3.375c0 .621-.504 1.125-1.125 1.125h-1.5a.375.375 0 0 0-.375.375c0 7.04 5.71 12.75 12.75 12.75a.375.375 0 0 0 .375-.375v-1.5c0-.621.504-1.125 1.125-1.125h3.375c.621 0 1.125.504 1.125 1.125v3.375c0 1.036-.84 1.875-1.875 1.875h-1.5C9.708 22.5 1.5 14.292 1.5 4.5v-1.5Z" clipRule="evenodd" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 0 1 1.04-.208Z" clipRule="evenodd" />
    </svg>
  );
}

const stats = [
  { value: "40+", label: "Años de experiencia", icon: <IconClock /> },
  { value: "200+", label: "Estudios disponibles", icon: <IconFlask /> },
  { value: "ISO", label: "Sistema de calidad", icon: <IconShield /> },
  { value: "Digital", label: "Resultados disponibles", icon: <IconMonitor /> },
];

const servicios = [
  { icon: <IconFlask />, title: "Análisis clínicos", desc: "Desde un estudio de rutina hasta pruebas especializadas, siempre bajo procesos certificados.", href: "/estudios#catalogo", cta: "Ver catálogo" },
  { icon: <IconPackage />, title: "Paquetes preventivos", desc: "Perfiles ya armados para chequeos generales, empresas y el seguimiento de tu familia.", href: "/estudios#paquetes", cta: "Ver paquetes" },
  { icon: <IconPhone />, title: "Atención directa", desc: "Agenda, pregunta lo que necesites y sigue tus resultados, directo por WhatsApp.", href: "/contacto#agenda", cta: "Agendar cita" },
];

const valores = [
  { icon: <IconTarget />, title: "Criterio clínico", desc: "Ningún resultado sale sin que alguien lo revise con calma primero." },
  { icon: <IconUsers />, title: "Trato humano", desc: "Te decimos los pasos, los tiempos y qué llevar, sin tecnicismos de más." },
  { icon: <IconShield />, title: "Privacidad", desc: "Tus datos y resultados quedan bajo acceso controlado. Punto." },
  { icon: <IconCheck />, title: "Calidad ISO", desc: "Operamos bajo un sistema de gestión ISO 9001:2015." },
];

const rutasRapidas = [
  { title: "Quiero hacerme un estudio", desc: "Consulta pruebas, tiempos de entrega y tipo de muestra.", href: "/estudios#catalogo" },
  { title: "Busco un chequeo preventivo", desc: "Elige un paquete y agenda por WhatsApp.", href: "/estudios#paquetes" },
  { title: "Necesito una cita", desc: "Déjanos tus datos o escríbenos directo.", href: "/contacto#agenda" },
  { title: "Quiero trabajar en LAD", desc: "Revisa vacantes y envía tu postulación.", href: "/unete#vacantes" },
];

const heroVideos = ["/vids/inicio/hero1.mp4", "/vids/inicio/hero2.mp4", "/vids/inicio/hero3.mp4"];
const heroTitles = ["precisos", "confiables", "certificados", "inmediatos", "claros"];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<HTMLSpanElement[]>([]);
  const [heroIdx, setHeroIdx] = useState(0);
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
          <VideoAuto
            key={heroIdx}
            src={heroVideos[heroIdx]}
            loop={false}
            onEnded={() => setHeroIdx((i) => (i + 1) % heroVideos.length)}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-lad-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-lad-black/95 via-transparent to-lad-black/20" />
        </div>

        <div className="container-lad relative z-10">
          <div className="mx-auto max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-lad-red animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Certificado ISO 9001:2015</span>
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
              <div className="opacity-70">{stat.icon}</div>
              <span ref={(el) => { if (el) counterRefs.current[index] = el; }} data-target={stat.value} className="block font-display text-4xl font-black md:text-5xl">
                {stat.value}
              </span>
              <span className="text-sm text-red-100">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

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
                  <div className="mb-6 flex h-14 w-14 items-center justify-center bg-lad-gray-light text-lad-red transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-lad-red group-hover:text-white group-hover:scale-105">
                    {servicio.icon}
                  </div>
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
                src="/vids/inicio/quienes-somos.mp4"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lad-black/40 to-transparent" />
              <div className="absolute bottom-6 right-6 rounded-xl bg-lad-red p-6 text-center text-white shadow-lg shadow-lad-red/30">
                <p className="font-display text-3xl font-black">40+</p>
                <p className="text-xs">años de servicio</p>
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
      <section className="section-padding bg-lad-black text-white">
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
                <Link href={ruta.href} className="group flex h-full flex-col justify-between border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-lad-red hover:bg-white/[0.06]">
                  <span className="mb-8 block h-1 w-10 bg-lad-red transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-16" />
                  <span>
                    <span className="block font-display text-lg font-bold transition-colors duration-300 group-hover:text-lad-red-light">{ruta.title}</span>
                    <span className="mt-3 block text-sm leading-relaxed text-gray-400">{ruta.desc}</span>
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
                  <div className="mb-4 flex h-10 w-10 items-center justify-center bg-lad-red text-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
                    {valor.icon}
                  </div>
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
