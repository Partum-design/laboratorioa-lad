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
    <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" className="h-6 w-6 text-lad-red">
      <path d="M12,12 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0" />
      <path d="M12,12 m-6.5,0 a6.5,6.5 0 1,0 13,0 a6.5,6.5 0 1,0 -13,0" />
      <path d="M12,12 m-2.5,0 a2.5,2.5 0 1,0 5,0 a2.5,2.5 0 1,0 -5,0" />
    </svg>
  );
}
function IconEye() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-lad-red">
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  );
}
function IconFlask() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path fillRule="evenodd" d="M9.75 2.25a.75.75 0 0 0 0 1.5h.75v3.378a3 3 0 0 1-.405 1.51L5.967 16.5a2.625 2.625 0 0 0 2.273 3.937h7.52a2.625 2.625 0 0 0 2.273-3.937l-4.128-7.862a3 3 0 0 1-.405-1.51V3.75h.75a.75.75 0 0 0 0-1.5h-4.5Zm.75 6.378V3.75h3v4.878a4.5 4.5 0 0 0 .607 2.265l1.282 2.442a23.025 23.025 0 0 0-8.336.49l1.84-3.5a4.5 4.5 0 0 0 .607-2.264Z" clipRule="evenodd" />
    </svg>
  );
}
function IconScan() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M3 3h6v2H5v4H3V3Zm12 0h6v6h-2V5h-4V3ZM3 15h2v4h4v2H3v-6Zm16 0h2v6h-6v-2h4v-4Z" />
    </svg>
  );
}
function IconRayos() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <rect x="6" y="10.5" width="12" height="3" rx="1.5" transform="rotate(45 12 12)" />
      <circle cx="7.76" cy="7.76" r="3" />
      <circle cx="16.24" cy="16.24" r="3" />
    </svg>
  );
}
function IconCulture() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" className="h-6 w-6">
      <path d="M12,12 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0" />
      <path d="M12,12 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0" />
      <path d="M9,10 m-1.3,0 a1.3,1.3 0 1,0 2.6,0 a1.3,1.3 0 1,0 -2.6,0" />
      <path d="M15,9 m-1.3,0 a1.3,1.3 0 1,0 2.6,0 a1.3,1.3 0 1,0 -2.6,0" />
      <path d="M13,15 m-1.1,0 a1.1,1.1 0 1,0 2.2,0 a1.1,1.1 0 1,0 -2.2,0" />
      <path d="M8,15 m-1,0 a1,1 0 1,0 2,0 a1,1 0 1,0 -2,0" />
    </svg>
  );
}
function IconCertificate() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path fillRule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
    </svg>
  );
}
function IconAward() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006Z" clipRule="evenodd" />
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
    icono: <IconCulture />,
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
