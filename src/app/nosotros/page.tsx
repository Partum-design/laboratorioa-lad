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
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
function IconFlask() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 17.9A2 2 0 0 0 6.496 21h11.008a2 2 0 0 0 1.776-2.1l-5.069-8.477A2 2 0 0 1 14 9.527V2" />
      <path d="M8.5 2h7" />
      <path d="M7 16h10" />
    </svg>
  );
}
function IconScan() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <line x1="7" y1="12" x2="17" y2="12" />
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
function IconDNA() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M2 15c6.667-6 13.333 0 20-6" />
      <path d="M2 9c6.667 6 13.333 0 20 6" />
      <path d="M7 11.5v1" />
      <path d="M17 11.5v1" />
      <path d="M4.5 8.5v1" />
      <path d="M19.5 8.5v1" />
      <path d="M4.5 14.5v1" />
      <path d="M19.5 14.5v1" />
    </svg>
  );
}
function IconCertificate() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <polyline points="9 13 11 15 15 11" />
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
    desc: "Biometría hemática, coagulación y morfología celular con equipos automatizados y revisión del equipo clínico.",
    video: ["/vids/nosotros/hematologia1.mp4", "/vids/nosotros/hematologia2.mp4"],
    img: null,
    icono: <IconFlask />,
    badge: "Área principal",
  },
  {
    nombre: "Resonancia Magnética",
    desc: "Estudios de imagen para tejidos blandos, articulaciones y órganos internos, con atención al detalle desde la toma hasta el reporte.",
    video: ["/vids/nosotros/resonancia.mp4"],
    img: null,
    icono: <IconScan />,
    badge: "",
  },
  {
    nombre: "Rayos X / Radiología",
    desc: "Radiología digital con procesamiento de imagen y entrega práctica para pacientes y médicos.",
    video: ["/vids/nosotros/xray1.mp4", "/vids/nosotros/xray2.mp4"],
    img: null,
    icono: <IconRayos />,
    badge: "",
  },
  {
    nombre: "Química Clínica",
    desc: "Química sanguínea, perfiles metabólicos, hepáticos, renales y lipídicos con procesos controlados.",
    video: null,
    img: "/img/ai-generated-6a1dc1076908f.png",
    icono: <IconFlask />,
    badge: "",
  },
  {
    nombre: "Microbiología",
    desc: "Cultivos, antibiogramas e identificación bacteriana con tiempos claros de seguimiento.",
    video: null,
    img: "/img/ChatGPT-Image-2-jun-2026-12_10_37-p.m-1.png",
    icono: <IconDNA />,
    badge: "",
  },
  {
    nombre: "Inmunología y Hormonas",
    desc: "Pruebas hormonales, infecciosas y autoinmunes para apoyar decisiones médicas específicas.",
    video: null,
    img: "/img/image-1.png",
    icono: <IconShield />,
    badge: "",
  },
];

const hitos = [
  { año: "1985", titulo: "Fundación", desc: "Abrimos con una idea simple: entregar diagnósticos confiables y tratables en consulta." },
  { año: "2013", titulo: "Certificación ISO", desc: "Ordenamos procesos, controles y documentación bajo norma internacional." },
  { año: "2017", titulo: "Nueva tecnología", desc: "Sumamos equipos para pruebas de mayor complejidad y mejor seguimiento interno." },
  { año: "2021", titulo: "Resultados digitales", desc: "Facilitamos la entrega de resultados en línea para pacientes y médicos." },
  { año: "2024", titulo: "ISO 9001:2015", desc: "Actualizamos procesos para mantener la certificación vigente." },
];

const valores = [
  { icon: <IconCertificate />, label: "Calidad certificada" },
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
            Más de 40 años al <span className="text-lad-red">servicio</span> de tu salud
          </motion.h1>
          <p className="body-lg mx-auto max-w-2xl text-justify text-gray-300">
            Somos un laboratorio que cuida el proceso completo: toma de muestra, análisis, entrega y explicación cuando el paciente la necesita.
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
                  Entregar resultados confiables y oportunos para apoyar decisiones médicas.
                </p>
              </div>
              <div className="border-lad">
                <div className="mb-4 flex items-center gap-3">
                  <IconEye />
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Visión</p>
                </div>
                <h3 className="mb-3 font-display text-2xl font-bold">Hacia dónde vamos</h3>
                <p className="text-justify leading-relaxed text-gray-600">
                  Crecer como laboratorio regional con procesos claros, buen trato y mejora continua certificada.
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
                Cada área tiene controles propios, personal capacitado y una ruta clara para entregar resultados útiles.
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
