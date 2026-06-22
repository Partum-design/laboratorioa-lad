"use client";

import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const categorias = ["Todos", "Hematologia", "Quimica Sanguinea", "Inmunologia", "Microbiologia", "Uroanalisis", "Hormonas"];

const estudios = [
  { cat: "Hematologia", nombre: "Biometria Hematica Completa", tiempo: "2-4 hrs", muestra: "Sangre venosa", precio: "$150", desc: "Evaluacion completa de celulas sanguineas." },
  { cat: "Quimica Sanguinea", nombre: "Glucosa en Ayuno", tiempo: "1-2 hrs", muestra: "Sangre venosa", precio: "$80", desc: "Medicion de niveles de glucosa." },
  { cat: "Quimica Sanguinea", nombre: "Perfil Lipidico Completo", tiempo: "2-4 hrs", muestra: "Sangre venosa", precio: "$220", desc: "Colesterol total, HDL, LDL y trigliceridos." },
  { cat: "Inmunologia", nombre: "ELISA para HIV 1 y 2", tiempo: "4-6 hrs", muestra: "Sangre venosa", precio: "$350", desc: "Deteccion de anticuerpos." },
  { cat: "Hormonas", nombre: "Tiroides T3, T4, TSH", tiempo: "4-6 hrs", muestra: "Sangre venosa", precio: "$480", desc: "Panel completo de funcion tiroidea." },
  { cat: "Uroanalisis", nombre: "Examen General de Orina", tiempo: "1-2 hrs", muestra: "Orina", precio: "$90", desc: "Analisis fisico, quimico y microscopico." },
  { cat: "Microbiologia", nombre: "Urocultivo y Antibiograma", tiempo: "24-48 hrs", muestra: "Orina", precio: "$320", desc: "Identificacion bacteriana y sensibilidad antibiotica." },
  { cat: "Hematologia", nombre: "Velocidad de Sedimentacion", tiempo: "2 hrs", muestra: "Sangre venosa", precio: "$120", desc: "Indicador de inflamacion sistemica." },
  { cat: "Quimica Sanguinea", nombre: "Perfil Hepatico", tiempo: "4-6 hrs", muestra: "Sangre venosa", precio: "$380", desc: "Evaluacion de funcion hepatica." },
  { cat: "Hormonas", nombre: "Cortisol Serico", tiempo: "4-6 hrs", muestra: "Sangre venosa", precio: "$280", desc: "Evaluacion del eje adrenal." },
  { cat: "Inmunologia", nombre: "Factor Reumatoide", tiempo: "2-4 hrs", muestra: "Sangre venosa", precio: "$190", desc: "Apoyo en enfermedades autoinmunes." },
  { cat: "Uroanalisis", nombre: "Depuracion de Creatinina", tiempo: "24 hrs", muestra: "Orina 24h + Sangre", precio: "$240", desc: "Calculo de filtracion glomerular." },
];

const paquetes = [
  { nombre: "Paquete Basico", precio: "$450", estudios: ["Biometria Hematica", "Glucosa", "Quimica Sanguinea 6", "EGO"], badge: "" },
  { nombre: "Paquete Completo", precio: "$1,200", estudios: ["Biometria Hematica", "Perfil Lipidico", "Perfil Hepatico", "Funcion Renal", "Glucosa", "EGO", "TSH"], badge: "Mas popular" },
  { nombre: "Paquete Premium", precio: "$2,800", estudios: ["Todo el Paquete Completo", "Hormonas Completo", "Marcadores Tumorales", "Perfil Cardiaco", "Cultivos"], badge: "Completo" },
];

export default function EstudiosPage() {
  const [activeCat, setActiveCat] = useState("Todos");
  const filtrados = activeCat === "Todos" ? estudios : estudios.filter((estudio) => estudio.cat === activeCat);

  return (
    <PageTransition>
      <section className="relative overflow-hidden bg-lad-black pb-24 pt-32">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-lad-red" />
        <div className="container-lad relative z-10">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Catalogo</p>
          <h1 className="heading-xl mb-4 text-white">Nuestros <span className="text-lad-red">Estudios</span></h1>
          <p className="body-lg max-w-2xl text-gray-400">Mas de 200 tipos de analisis clinicos con tecnologia de punta y resultados precisos.</p>
        </div>
      </section>

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
                  {paquete.badge && <span className="absolute -top-3 left-6 bg-lad-red px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">{paquete.badge}</span>}
                  <h3 className="mb-2 font-display text-xl font-bold">{paquete.nombre}</h3>
                  <p className="mb-6 font-display text-4xl font-black text-lad-red">{paquete.precio}</p>
                  <ul className="mb-8 space-y-2">
                    {paquete.estudios.map((estudio) => <li key={estudio} className="text-sm text-gray-600">- {estudio}</li>)}
                  </ul>
                  <Link href="/contacto" className={index === 1 ? "btn-primary w-full" : "btn-outline w-full"}>Solicitar paquete</Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-lad">
          <div className="mb-10 flex flex-wrap gap-3">
            {categorias.map((cat) => (
              <button key={cat} type="button" onClick={() => setActiveCat(cat)} className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${activeCat === cat ? "bg-lad-red text-white" : "bg-lad-gray-light text-lad-black hover:bg-gray-200"}`}>
                {cat}
              </button>
            ))}
          </div>
          <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filtrados.map((estudio) => (
                <motion.article key={estudio.nombre} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} className="border border-gray-100 p-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-lad-red">{estudio.cat}</p>
                  <h3 className="mb-3 font-display text-xl font-bold">{estudio.nombre}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-gray-600">{estudio.desc}</p>
                  <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500">
                    <span>{estudio.tiempo}</span>
                    <span>{estudio.muestra}</span>
                    <span className="font-bold text-lad-red">{estudio.precio}</span>
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
