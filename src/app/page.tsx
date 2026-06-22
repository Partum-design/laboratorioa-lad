"use client";

import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: "15+", label: "anos de experiencia" },
  { value: "200+", label: "estudios clinicos" },
  { value: "24h", label: "resultados rapidos" },
  { value: "99%", label: "precision operativa" },
];

const servicios = [
  { title: "Analisis clinicos", desc: "Estudios de rutina y alta especialidad con tecnologia confiable." },
  { title: "Paquetes preventivos", desc: "Perfiles pensados para chequeos generales, empresariales y familiares." },
  { title: "Resultados digitales", desc: "Entrega agil, clara y segura para pacientes y medicos." },
];

const valores = [
  { title: "Tecnologia", desc: "Equipos de ultima generacion para resultados precisos y confiables." },
  { title: "Profesionales", desc: "Equipo certificado con amplia experiencia en diagnostico clinico." },
  { title: "Confidencialidad", desc: "Tus datos y resultados siempre seguros y protegidos." },
  { title: "Calidad", desc: "Certificacion ISO 9001:2015 que garantiza excelencia en cada proceso." },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<HTMLSpanElement[]>([]);

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
      <section ref={heroRef} className="relative flex h-screen min-h-[620px] items-center overflow-hidden">
        <div className="hero-bg absolute inset-0 -top-10">
          <Image src="/img/ai-generated-6a1dc1076908f.png" alt="LAD Laboratorio" fill priority className="object-cover" />
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
              Precision que <span className="text-lad-red">genera</span> confianza
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="mb-10 max-w-xl text-lg leading-relaxed text-gray-300">
              Laboratorio de Apoyo y Diagnostico: resultados confiables con tecnologia de vanguardia y profesionales certificados.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap gap-4">
              <Link href="/estudios" className="btn-primary">Ver estudios</Link>
              <Link href="/contacto" className="btn-white">Solicitar cita</Link>
            </motion.div>
          </div>
        </div>
      </section>

      <div ref={statsRef} className="bg-lad-red py-10">
        <div className="container-lad grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center text-white">
              <span ref={(el) => { if (el) counterRefs.current[index] = el; }} data-target={stat.value} className="block font-display text-4xl font-black md:text-5xl">
                {stat.value}
              </span>
              <span className="mt-1 block text-sm text-red-100">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

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
                  <div className="mb-6 flex h-14 w-14 items-center justify-center bg-lad-gray-light font-display text-xl font-black text-lad-red">{index + 1}</div>
                  <h3 className="heading-md mb-3 text-lad-black">{servicio.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{servicio.desc}</p>
                  <Link href="/estudios" className="mt-6 inline-flex text-sm font-bold text-lad-red">Conocer mas</Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-lad-gray-light">
        <div className="container-lad grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <ScrollReveal direction="left">
            <div className="relative h-[480px] overflow-hidden">
              <Image src="/img/image.png" alt="Interior de laboratorio LAD" fill className="object-cover" />
              <div className="absolute bottom-6 right-6 bg-lad-red p-6 text-center text-white">
                <p className="font-display text-3xl font-black">15+</p>
                <p className="text-xs">anos de excelencia</p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Quienes somos</p>
              <h2 className="heading-lg">Diagnosticos confiables, <span className="text-lad-red">resultados</span> que importan</h2>
              <p className="body-lg">Acompanamos a pacientes, medicos y empresas con procesos claros, trato humano y estandares de calidad medibles.</p>
              <Link href="/nosotros" className="btn-outline">Conoce LAD</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-lad grid grid-cols-1 gap-6 md:grid-cols-4">
          {valores.map((valor, index) => (
            <ScrollReveal key={valor.title} delay={index * 0.1}>
              <div className="h-full border-l-4 border-lad-red bg-lad-gray-light p-6">
                <h3 className="mb-2 font-display text-xl font-bold">{valor.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{valor.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
