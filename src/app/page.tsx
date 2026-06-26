"use client";

import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconFlask() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
      <path d="M9 3h6m-5 0v6l-5 9a1 1 0 0 0 .9 1.5h12.2a1 1 0 0 0 .9-1.5L14 9V3" />
    </svg>
  );
}
function IconPackage() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const stats = [
  { value: "15+", label: "Años de experiencia", icon: <IconClock /> },
  { value: "200+", label: "Estudios disponibles", icon: <IconFlask /> },
  { value: "ISO", label: "Sistema de calidad", icon: <IconShield /> },
  { value: "Digital", label: "Resultados disponibles", icon: <IconStar /> },
];

const servicios = [
  { icon: <IconFlask />, title: "Análisis clínicos", desc: "Estudios de rutina y pruebas especializadas con procesos certificados.", href: "/estudios#catalogo", cta: "Ver catálogo" },
  { icon: <IconPackage />, title: "Paquetes preventivos", desc: "Perfiles para chequeos generales, empresas y seguimiento familiar.", href: "/estudios#paquetes", cta: "Ver paquetes" },
  { icon: <IconPhone />, title: "Atención directa", desc: "Agenda, resuelve dudas y da seguimiento a tus resultados por WhatsApp.", href: "/contacto#agenda", cta: "Agendar cita" },
];

const valores = [
  { icon: <IconStar />, title: "Criterio clínico", desc: "Revisamos cada estudio con cuidado antes de entregar resultados." },
  { icon: <IconUsers />, title: "Trato humano", desc: "Te explicamos los pasos, los tiempos y lo que necesitas llevar." },
  { icon: <IconShield />, title: "Privacidad", desc: "Tus datos y resultados se manejan con acceso controlado." },
  { icon: <IconCheck />, title: "Calidad ISO", desc: "Trabajamos bajo un sistema de gestión ISO 9001:2015." },
];

const rutasRapidas = [
  { title: "Quiero hacerme un estudio", desc: "Consulta pruebas, tiempos de entrega y tipo de muestra.", href: "/estudios#catalogo" },
  { title: "Busco un chequeo preventivo", desc: "Elige un paquete y agenda por WhatsApp.", href: "/estudios#paquetes" },
  { title: "Necesito una cita", desc: "Déjanos tus datos o escríbenos directo.", href: "/contacto#agenda" },
  { title: "Quiero trabajar en LAD", desc: "Revisa vacantes y envía tu postulación.", href: "/unete#vacantes" },
];

const heroVideos = ["/vids/inicio/hero1.mp4", "/vids/inicio/hero2.mp4", "/vids/inicio/hero3.mp4"];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<HTMLSpanElement[]>([]);
  const [heroIdx, setHeroIdx] = useState(0);

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
      <section ref={heroRef} className="relative flex h-screen min-h-[620px] items-center overflow-hidden">
        <div className="hero-bg absolute inset-0 -top-10">
          <VideoAuto
            key={heroIdx}
            src={heroVideos[heroIdx]}
            loop={false}
            onEnded={() => setHeroIdx((i) => (i + 1) % heroVideos.length)}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-lad-black/90 via-lad-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-lad-black/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-lad-red" />

        <div className="container-lad relative z-10">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-lad-red" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-lad-red">ISO 9001:2015 Certificado</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="heading-xl mb-6 text-white">
              Diagnósticos claros para decidir <span className="text-lad-red">a tiempo</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="mb-10 max-w-xl text-justify text-lg leading-relaxed text-gray-300">
              En LAD hacemos análisis clínicos, paquetes preventivos y seguimiento de resultados con procesos certificados y atención cercana.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap gap-4">
              <Link href="/estudios#catalogo" className="btn-primary">Ver estudios</Link>
              <a href={LAD_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-white">Agendar por WhatsApp</a>
            </motion.div>
          </div>
        </div>
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
                <div className="card-hover border border-gray-100 bg-white p-8 hover:border-lad-red">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center bg-lad-gray-light text-lad-red">
                    {servicio.icon}
                  </div>
                  <h3 className="heading-md mb-3 text-lad-black">{servicio.title}</h3>
                  <p className="text-justify text-sm leading-relaxed text-gray-500">{servicio.desc}</p>
                  <Link href={servicio.href} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-lad-red">
                    {servicio.cta}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
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
            <div className="relative h-[480px] overflow-hidden">
              <VideoAuto
                src="/vids/inicio/quienes-somos.mp4"
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-6 right-6 bg-lad-red p-6 text-center text-white">
                <p className="font-display text-3xl font-black">15+</p>
                <p className="text-xs">años de servicio</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Quiénes somos</p>
              <h2 className="heading-lg">Resultados que llegan claros, <span className="text-lad-red">sin vueltas</span></h2>
              <p className="text-justify body-lg">Acompañamos a pacientes, médicos y empresas con procesos claros, trato humano y estándares de calidad medibles.</p>
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
                <Link href={ruta.href} className="group flex h-full flex-col justify-between border border-white/10 bg-white/[0.03] p-6 transition hover:border-lad-red hover:bg-white/[0.06]">
                  <span className="mb-8 block h-1 w-10 bg-lad-red transition group-hover:w-16" />
                  <span>
                    <span className="block font-display text-lg font-bold">{ruta.title}</span>
                    <span className="mt-3 block text-sm leading-relaxed text-gray-400">{ruta.desc}</span>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

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
                <div className="h-full border-l-4 border-lad-red bg-lad-gray-light p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center bg-lad-red text-white">
                    {valor.icon}
                  </div>
                  <h3 className="mb-2 font-display text-xl font-bold">{valor.title}</h3>
                  <p className="text-justify text-sm leading-relaxed text-gray-600">{valor.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
