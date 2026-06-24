"use client";

import PageTransition from "@/components/PageTransition";
import VideoAuto from "@/components/VideoAuto";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";


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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconFlask() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M9 3h6m-5 0v6l-5 9a1 1 0 0 0 .9 1.5h12.2a1 1 0 0 0 .9-1.5L14 9V3" />
    </svg>
  );
}
function IconMagnetic() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}
function IconRayos() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function IconMicro() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M6 18h8" /><path d="M3 22h18" /><path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" /><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
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

const areas = [
  {
    nombre: "Hematología",
    desc: "Analizadores automáticos de última generación para biometría hemática, coagulación y morfología celular con alta precisión.",
    video: ["/vids/nosotros/hematologia1.mp4", "/vids/nosotros/hematologia2.mp4"],
    img: null,
    icono: <IconFlask />,
    badge: "Área principal",
  },
  {
    nombre: "Resonancia Magnética",
    desc: "Equipo de resonancia de alto campo para obtención de imágenes detalladas de tejidos blandos, articulaciones y órganos internos.",
    video: ["/vids/nosotros/resonancia.mp4"],
    img: null,
    icono: <IconMagnetic />,
    badge: "",
  },
  {
    nombre: "Rayos X / Radiología",
    desc: "Sistemas digitales de radiología con procesamiento inmediato de imágenes y almacenamiento seguro en la nube para consulta remota.",
    video: ["/vids/nosotros/xray1.mp4", "/vids/nosotros/xray2.mp4"],
    img: null,
    icono: <IconRayos />,
    badge: "",
  },
  {
    nombre: "Química Clínica",
    desc: "Plataforma automatizada de química sanguínea, perfiles metabólicos, hepáticos, renales y lipídicos con resultados en tiempo récord.",
    video: null,
    img: "/img/ai-generated-6a1dc1076908f.png",
    icono: <IconFlask />,
    badge: "",
  },
  {
    nombre: "Microbiología",
    desc: "Laboratorio de cultivos, antibiogramas e identificación bacteriana con incubadoras de control automatizado y lectura espectrométrica.",
    video: null,
    img: "/img/ChatGPT-Image-2-jun-2026-12_10_37-p.m-1.png",
    icono: <IconMicro />,
    badge: "",
  },
  {
    nombre: "Inmunología y Hormonas",
    desc: "Analizadores de quimioluminiscencia para marcadores tumorales, hormonas tiroideas, pruebas infecciosas y autoinmunidad.",
    video: null,
    img: "/img/image-1.png",
    icono: <IconShield />,
    badge: "",
  },
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

function AreaMedia({ area }: { area: typeof areas[0] }) {
  const [idx, setIdx] = useState(0);

  if (area.video) {
    return (
      <VideoAuto
        key={idx}
        src={area.video[idx]}
        loop={area.video.length === 1}
        onEnded={area.video.length > 1 ? () => setIdx((i) => (i + 1) % area.video!.length) : undefined}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }
  return (
    <Image
      src={area.img!}
      alt={area.nombre}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

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
          <VideoAuto src="/vids/nosotros/hero.mp4" className="h-full w-full object-cover" />
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
              <VideoAuto src="/vids/nosotros/mision.mp4" className="h-full w-full object-cover" />
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

      {/* Áreas y Equipamiento */}
      <section className="section-padding bg-white">
        <div className="container-lad">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Infraestructura</p>
              <h2 className="heading-lg">Nuestras áreas y <span className="text-lad-red">equipamiento</span></h2>
              <p className="mx-auto mt-4 max-w-2xl text-justify text-gray-500">
                Contamos con tecnología de vanguardia en cada área del laboratorio, garantizando resultados precisos, rápidos y confiables para cada paciente.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((area, index) => (
              <ScrollReveal key={area.nombre} delay={index * 0.1}>
                <div className="group relative overflow-hidden border border-gray-100 transition-all hover:border-lad-red hover:shadow-lg">
                  {/* Media */}
                  <div className="relative h-56 overflow-hidden">
                    <AreaMedia area={area} />
                    <div className="absolute inset-0 bg-gradient-to-t from-lad-black/70 to-transparent" />
                    {/* Badge */}
                    {area.badge && (
                      <span className="absolute left-4 top-4 bg-lad-red px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        {area.badge}
                      </span>
                    )}
                    {/* Ícono flotante */}
                    <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-lad-red text-white">
                      {area.icono}
                    </div>
                  </div>
                  {/* Texto */}
                  <div className="p-6">
                    <h3 className="mb-2 font-display text-xl font-bold text-lad-black">{area.nombre}</h3>
                    <p className="text-justify text-sm leading-relaxed text-gray-600">{area.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Valores al fondo */}
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
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
