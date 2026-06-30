"use client";

import PageTransition from "@/components/PageTransition";
import VideoAuto from "@/components/VideoAuto";
import ScrollReveal from "@/components/ScrollReveal";
import { IconBadge, IconChip } from "@/components/IconBadge";
import {
  IconAward,
  IconCertificate,
  IconCulture,
  IconEye,
  IconFocus,
  IconLock,
  IconScan,
  IconShieldCheck,
  IconTestTubes,
  IconXRay,
} from "@/components/LadIcons";
import { iconColorAt } from "@/lib/icon-palette";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const areas = [
  {
    nombre: "Hematología",
    desc: "Biometría hemática, coagulación y morfología celular con equipos automatizados y revisión del equipo clínico.",
    video: ["/vids/nosotros/hematologia1.mp4", "/vids/nosotros/hematologia2.mp4"],
    img: null,
    icono: <IconTestTubes />,
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
    icono: <IconXRay />,
    badge: "",
  },
  {
    nombre: "Química Clínica",
    desc: "Química sanguínea, perfiles metabólicos, hepáticos, renales y lipídicos con procesos controlados.",
    video: null,
    img: "/img/ai-generated-6a1dc1076908f.png",
    icono: <IconTestTubes />,
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
    icono: <IconShieldCheck />,
    badge: "",
  },
];

const hitos = [
  { año: "1985", titulo: "Fundación", desc: "Abrimos con una idea simple: entregar diagnósticos confiables y tratables en consulta." },
  { año: "2017", titulo: "Nueva tecnología", desc: "Sumamos equipos para pruebas de mayor complejidad y mejor seguimiento interno." },
  { año: "2021", titulo: "Resultados digitales", desc: "Facilitamos la entrega de resultados en línea para pacientes y médicos." },
  { año: "2026", titulo: "ISO 9001:2015", desc: "Actualizamos procesos para mantener la certificación vigente con ayuda de Indusecc." },
];

const valores = [
  { icon: <IconCertificate />, label: "Calidad certificada" },
  { icon: <IconLock />, label: "Confidencialidad" },
  { icon: <IconShieldCheck />, label: "Tecnología avanzada" },
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
            40+ años de <span className="text-lad-red">experiencia</span> al servicio de tu salud
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
                  <IconChip color={iconColorAt(0)}><IconFocus /></IconChip>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Misión</p>
                </div>
                <h3 className="mb-3 font-display text-2xl font-bold">Qué nos mueve</h3>
                <p className="text-justify leading-relaxed text-gray-600">
                  Entregar resultados confiables y oportunos para apoyar decisiones médicas.
                </p>
              </div>
              <div className="border-lad">
                <div className="mb-4 flex items-center gap-3">
                  <IconChip color={iconColorAt(1)}><IconEye /></IconChip>
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
                    <IconBadge color={iconColorAt(index)} className="absolute bottom-4 right-4 h-10 w-10">
                      {area.icono}
                    </IconBadge>
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
            {valores.map((v, index) => (
              <div key={v.label} className="flex items-center gap-3 bg-lad-gray-light p-5">
                <IconBadge color={iconColorAt(index + 2)} className="h-9 w-9">{v.icon}</IconBadge>
                <p className="text-sm font-bold">{v.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
