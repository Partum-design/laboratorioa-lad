"use client";

import PageTransition from "@/components/PageTransition";
import VideoAuto from "@/components/VideoAuto";
import ScrollReveal from "@/components/ScrollReveal";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-lad-red">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconDroplet() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}
function IconTag() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}
function IconFilter() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

const categorias = ["Todos", "Hematología", "Química Sanguínea", "Inmunología", "Microbiología", "Uroanálisis", "Hormonas"];

const estudios = [
  { cat: "Hematología", nombre: "Biometría Hemática Completa", tiempo: "2-4 hrs", muestra: "Sangre venosa", precio: "$150", desc: "Evaluación completa de células sanguíneas: eritrocitos, leucocitos y plaquetas." },
  { cat: "Química Sanguínea", nombre: "Glucosa en Ayuno", tiempo: "1-2 hrs", muestra: "Sangre venosa", precio: "$80", desc: "Medición de niveles de glucosa en sangre para diagnóstico de diabetes." },
  { cat: "Química Sanguínea", nombre: "Perfil Lipídico Completo", tiempo: "2-4 hrs", muestra: "Sangre venosa", precio: "$220", desc: "Colesterol total, HDL, LDL y triglicéridos para evaluar riesgo cardiovascular." },
  { cat: "Inmunología", nombre: "ELISA para VIH 1 y 2", tiempo: "4-6 hrs", muestra: "Sangre venosa", precio: "$350", desc: "Detección de anticuerpos específicos con alta sensibilidad y especificidad." },
  { cat: "Hormonas", nombre: "Tiroides T3, T4, TSH", tiempo: "4-6 hrs", muestra: "Sangre venosa", precio: "$480", desc: "Panel completo de función tiroidea para evaluación integral de la glándula." },
  { cat: "Uroanálisis", nombre: "Examen General de Orina", tiempo: "1-2 hrs", muestra: "Orina", precio: "$90", desc: "Análisis físico, químico y microscópico con reporte detallado de resultados." },
  { cat: "Microbiología", nombre: "Urocultivo y Antibiograma", tiempo: "24-48 hrs", muestra: "Orina", precio: "$320", desc: "Identificación bacteriana y sensibilidad antibiótica para orientar el tratamiento." },
  { cat: "Hematología", nombre: "Velocidad de Sedimentación", tiempo: "2 hrs", muestra: "Sangre venosa", precio: "$120", desc: "Indicador de inflamación sistémica utilizado como apoyo diagnóstico." },
  { cat: "Química Sanguínea", nombre: "Perfil Hepático", tiempo: "4-6 hrs", muestra: "Sangre venosa", precio: "$380", desc: "Evaluación de función hepática: transaminasas, bilirrubinas y proteínas." },
  { cat: "Hormonas", nombre: "Cortisol Sérico", tiempo: "4-6 hrs", muestra: "Sangre venosa", precio: "$280", desc: "Evaluación del eje adrenal y diagnóstico de trastornos del estrés crónico." },
  { cat: "Inmunología", nombre: "Factor Reumatoide", tiempo: "2-4 hrs", muestra: "Sangre venosa", precio: "$190", desc: "Apoyo en diagnóstico de enfermedades autoinmunes como artritis reumatoide." },
  { cat: "Uroanálisis", nombre: "Depuración de Creatinina", tiempo: "24 hrs", muestra: "Orina 24h + Sangre", precio: "$240", desc: "Cálculo de filtración glomerular para evaluar función renal en detalle." },
];

const paquetes = [
  { nombre: "Paquete Básico", precio: "$450", estudios: ["Biometría Hemática", "Glucosa", "Química Sanguínea 6", "EGO"], badge: "" },
  { nombre: "Paquete Completo", precio: "$1,200", estudios: ["Biometría Hemática", "Perfil Lipídico", "Perfil Hepático", "Función Renal", "Glucosa", "EGO", "TSH"], badge: "Más popular" },
  { nombre: "Paquete Premium", precio: "$2,800", estudios: ["Todo el Paquete Completo", "Hormonas Completo", "Marcadores Tumorales", "Perfil Cardíaco", "Cultivos"], badge: "Completo" },
];

export default function EstudiosPage() {
  const [activeCat, setActiveCat] = useState("Todos");
  const filtrados = activeCat === "Todos" ? estudios : estudios.filter((e) => e.cat === activeCat);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden bg-lad-black pb-24 pt-32">
        <div className="absolute inset-0">
          <VideoAuto src="/vids/estudios/hero.mp4" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-lad-black/90 via-lad-black/70 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-lad-red" />
        <div className="container-lad relative z-10">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Catálogo</p>
          <h1 className="heading-xl mb-4 text-white">Nuestros <span className="text-lad-red">Estudios</span></h1>
          <p className="body-lg max-w-2xl text-justify text-gray-400">Más de 200 tipos de análisis clínicos con tecnología de punta, resultados precisos y tiempos de entrega óptimos.</p>
        </div>
      </section>

      {/* Paquetes */}
      <section className="section-padding bg-lad-gray-light">
        <div className="container-lad">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Paquetes</p>
              <h2 className="heading-lg">Paquetes <span className="text-lad-red">preventivos</span></h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {paquetes.map((paquete, index) => (
              <ScrollReveal key={paquete.nombre} delay={index * 0.12}>
                <div className={`card-hover relative border-2 bg-white p-8 ${index === 1 ? "border-lad-red" : "border-gray-200"}`}>
                  {paquete.badge && (
                    <span className="absolute -top-3 left-6 bg-lad-red px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      {paquete.badge}
                    </span>
                  )}
                  <h3 className="mb-2 font-display text-xl font-bold">{paquete.nombre}</h3>
                  <p className="mb-6 font-display text-4xl font-black text-lad-red">{paquete.precio}</p>
                  <ul className="mb-8 space-y-2">
                    {paquete.estudios.map((e) => (
                      <li key={e} className="flex items-center gap-2 text-sm text-gray-600">
                        <IconCheck /> {e}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contacto" className={index === 1 ? "btn-primary w-full text-center block" : "btn-outline w-full text-center block"}>
                    Solicitar paquete
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo de estudios */}
      <section className="section-padding bg-white">
        <div className="container-lad">
          <div className="mb-8 flex items-center gap-3">
            <IconFilter />
            <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Filtrar por categoría</span>
          </div>
          <div className="mb-10 flex flex-wrap gap-3">
            {categorias.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCat(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${activeCat === cat ? "bg-lad-red text-white" : "bg-lad-gray-light text-lad-black hover:bg-gray-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filtrados.map((estudio) => (
                <motion.article
                  key={estudio.nombre}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="border border-gray-100 p-6 hover:border-lad-red transition-colors"
                >
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-lad-red">{estudio.cat}</p>
                  <h3 className="mb-3 font-display text-xl font-bold">{estudio.nombre}</h3>
                  <p className="mb-5 text-justify text-sm leading-relaxed text-gray-600">{estudio.desc}</p>
                  <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><IconClock /> {estudio.tiempo}</span>
                    <span className="flex items-center gap-1"><IconDroplet /> {estudio.muestra}</span>
                    <span className="flex items-center gap-1 font-bold text-lad-red"><IconTag /> {estudio.precio}</span>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
