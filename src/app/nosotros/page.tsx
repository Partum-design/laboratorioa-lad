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

const equipo = [
  { nombre: "Dr. Carlos Mendoza", cargo: "Director Medico", esp: "Patologia Clinica", img: "/img/image-1.png" },
  { nombre: "Dra. Ana Torres", cargo: "Jefa de Laboratorio", esp: "Bioquimica Clinica", img: "/img/image.png" },
  { nombre: "Q.F.B. Luis Ramos", cargo: "Analista Senior", esp: "Microbiologia", img: "/img/ai-generated-6a1c4771ba72a.png" },
];

const hitos = [
  { ano: "2009", titulo: "Fundacion", desc: "Abrimos nuestras puertas con la mision de ofrecer diagnosticos confiables." },
  { ano: "2013", titulo: "Certificacion ISO", desc: "Validamos nuestros estandares de calidad." },
  { ano: "2017", titulo: "Expansion tecnologica", desc: "Implementamos equipos para analisis de alta complejidad." },
  { ano: "2021", titulo: "Resultados digitales", desc: "Lanzamos entrega de resultados en linea." },
  { ano: "2024", titulo: "ISO 9001:2015", desc: "Renovacion y actualizacion de procesos." },
];

const valores = ["Calidad certificada", "Confidencialidad", "Tecnologia avanzada", "Equipo experto"];

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
      <section className="relative overflow-hidden pb-24 pt-36">
        <div className="absolute inset-0">
          <Image src="/img/ChatGPT-Image-2-jun-2026-12_10_37-p.m-1.png" alt="LAD nosotros" fill className="object-cover" />
          <div className="absolute inset-0 bg-lad-black/85" />
        </div>
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-lad-red" />
        <div className="container-lad relative z-10 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Nosotros</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="heading-xl mb-6 text-white">
            Mas de 15 anos al <span className="text-lad-red">servicio</span> de tu salud
          </motion.h1>
          <p className="body-lg mx-auto max-w-2xl text-gray-300">Somos un laboratorio comprometido con la precision, la calidad y el bienestar de cada paciente.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-lad grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="space-y-8">
              <div className="border-lad">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Mision</p>
                <h3 className="mb-3 font-display text-2xl font-bold">Que nos mueve</h3>
                <p className="leading-relaxed text-gray-600">Proporcionar diagnostico clinico de alta calidad con resultados confiables, oportunos y precisos.</p>
              </div>
              <div className="border-lad">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Vision</p>
                <h3 className="mb-3 font-display text-2xl font-bold">Hacia donde vamos</h3>
                <p className="leading-relaxed text-gray-600">Ser referente regional en diagnostico clinico por tecnologia, servicio humano y mejora continua.</p>
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

      <section className="section-padding bg-lad-black text-white">
        <div className="container-lad">
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Historia</p>
            <h2 className="heading-lg">Nuestra trayectoria</h2>
          </div>
          <div ref={timelineRef} className="mx-auto max-w-4xl space-y-8">
            {hitos.map((hito) => (
              <div key={hito.ano} className="timeline-item border-l-4 border-lad-red bg-white/5 p-6">
                <p className="font-display text-3xl font-black text-lad-red">{hito.ano}</p>
                <h3 className="mt-2 font-display text-xl font-bold">{hito.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{hito.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-lad">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Equipo</p>
            <h2 className="heading-lg">Profesionales <span className="text-lad-red">certificados</span></h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {equipo.map((persona, index) => (
              <ScrollReveal key={persona.nombre} delay={index * 0.12}>
                <div className="border border-gray-100">
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
            {valores.map((valor) => <div key={valor} className="bg-lad-gray-light p-5 text-center text-sm font-bold">{valor}</div>)}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
