"use client";

import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-lad-red">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function IconEye() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-lad-red">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
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
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function IconAward() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

const equipo = [
  { nombre: "Dr. Carlos Mendoza", cargo: "Director Médico", esp: "Patología Clínica", img: "/img/image-1.png" },
  { nombre: "Dra. Ana Torres", cargo: "Jefa de Laboratorio", esp: "Bioquímica Clínica", img: "/img/image.png" },
  { nombre: "Q.F.B. Luis Ramos", cargo: "Analista Senior", esp: "Microbiología", img: "/img/ai-generated-6a1c4771ba72a.png" },
];

const hitos = [
  { año: "2009", titulo: "Fundación", desc: "Abrimos nuestras puertas con la misión de ofrecer diagnósticos confiables y accesibles." },
  { año: "2013", titulo: "Certificación ISO", desc: "Validamos nuestros estándares de calidad bajo norma internacional." },
  { año: "2017", titulo: "Expansión tecnológica", desc: "Implementamos equipos de última generación para análisis de alta complejidad." },
  { año: "2021", titulo: "Resultados digitales", desc: "Lanzamos plataforma de entrega de resultados en línea, segura y rápida." },
  { año: "2024", titulo: "ISO 9001:2015", desc: "Renovación y actualización de procesos bajo los más altos estándares." },
];

const valores = [
  { icon: <IconStar />, label: "Calidad certificada" },
  { icon: <IconLock />, label: "Confidencialidad" },
  { icon: <IconShield />, label: "Tecnología avanzada" },
  { icon: <IconAward />, label: "Equipo experto" },
];

export default function NosotrosPage() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;
    const ctx = gsap.context(() => {
      timelineRef.current!.querySelectorAll(".timeline-item").forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: index % 2 === 0 ? -60 : 60 },
          { opacity: 1, x: 0, duration: 0.8, scrollTrigger: { trigger: item, start: "top 85%" } },
        );
      });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden pb-24 pt-36">
        <div className="absolute inset-0">
          <Image src="/img/ChatGPT-Image-2-jun-2026-12_10_37-p.m-1.png" alt="LAD nosotros" fill className="object-cover" />
          <div className="absolute inset-0 bg-lad-black/85" />
        </div>
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-lad-red" />
        <div className="container-lad relative z-10 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">
            Nosotros
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="heading-xl mb-6 text-white">
            Más de 15 años al <span className="text-lad-red">servicio</span> de tu salud
          </motion.h1>
          <p className="body-lg mx-auto max-w-2xl text-justify text-gray-300">
            Somos un laboratorio comprometido con la precisión, la calidad y el bienestar de cada paciente que nos elige.
          </p>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="section-padding bg-white">
        <div className="container-lad grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="space-y-8">
              <div className="border-lad">
                <div className="mb-4 flex items-center gap-3">
                  <IconTarget />
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Misión</p>
                </div>
                <h3 className="mb-3 font-display text-2xl font-bold">Qué nos mueve</h3>
                <p className="text-justify leading-relaxed text-gray-600">
                  Proporcionar diagnóstico clínico de alta calidad con resultados confiables, oportunos y precisos que apoyen las decisiones médicas.
                </p>
              </div>
              <div className="border-lad">
                <div className="mb-4 flex items-center gap-3">
                  <IconEye />
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Visión</p>
                </div>
                <h3 className="mb-3 font-display text-2xl font-bold">Hacia dónde vamos</h3>
                <p className="text-justify leading-relaxed text-gray-600">
                  Ser referente regional en diagnóstico clínico por tecnología, servicio humano de excelencia y mejora continua certificada.
                </p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="relative h-[520px] overflow-hidden">
              <Image src="/img/ChatGPT-Image-2-jun-2026-12_10_37-p.m.png" alt="Equipo LAD" fill className="object-cover" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Historia */}
      <section className="section-padding bg-lad-black text-white">
        <div className="container-lad">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Historia</p>
            <h2 className="heading-lg">Nuestra trayectoria</h2>
          </div>
          <div ref={timelineRef} className="mx-auto max-w-4xl space-y-8">
            {hitos.map((hito) => (
              <div key={hito.año} className="timeline-item border-l-4 border-lad-red bg-white/5 p-6">
                <p className="font-display text-3xl font-black text-lad-red">{hito.año}</p>
                <h3 className="mt-2 font-display text-xl font-bold">{hito.titulo}</h3>
                <p className="mt-2 text-justify text-sm leading-relaxed text-gray-300">{hito.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="section-padding bg-white">
        <div className="container-lad">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Equipo</p>
            <h2 className="heading-lg">Profesionales <span className="text-lad-red">certificados</span></h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {equipo.map((persona, index) => (
              <ScrollReveal key={persona.nombre} delay={index * 0.12}>
                <div className="border border-gray-100 hover:border-lad-red transition-colors">
                  <div className="relative h-72">
                    <Image src={persona.img} alt={persona.nombre} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold">{persona.nombre}</h3>
                    <p className="mt-1 text-sm font-bold text-lad-red">{persona.cargo}</p>
                    <p className="mt-2 text-sm text-gray-500">{persona.esp}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {valores.map((v) => (
              <div key={v.label} className="flex items-center gap-3 bg-lad-gray-light p-5">
                <div className="text-lad-red">{v.icon}</div>
                <p className="text-sm font-bold">{v.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
