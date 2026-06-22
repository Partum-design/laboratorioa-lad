"use client";

import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const posiciones = [
  { titulo: "Quimico Farmacobiologo (QFB)", area: "Laboratorio Clinico", tipo: "Tiempo completo", req: ["Cedula profesional vigente", "2+ anos de experiencia", "Manejo de analizadores automatizados", "Disponibilidad para rotacion de turnos"] },
  { titulo: "Tecnico de Laboratorio", area: "Laboratorio Clinico", tipo: "Tiempo completo", req: ["Carrera tecnica en area de salud", "Experiencia en toma de muestras", "Trabajo en equipo", "Actitud de servicio"] },
  { titulo: "Recepcionista / Atencion al Paciente", area: "Area Administrativa", tipo: "Tiempo completo", req: ["Bachillerato o superior", "Excelente trato al cliente", "Manejo basico de computadora"] },
  { titulo: "Especialista en Microbiologia", area: "Microbiologia", tipo: "Tiempo completo", req: ["Especialidad en Microbiologia Clinica", "Experiencia en cultivos y antibiogramas", "Actualizacion continua"] },
];

const beneficios = ["Seguro de salud", "Capacitacion continua", "Horarios flexibles", "Crecimiento profesional", "Prestaciones superiores", "Buen ambiente laboral"];

export default function UnetePage() {
  const [activePos, setActivePos] = useState<number | null>(0);
  const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "", posicion: "", experiencia: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.querySelectorAll(".hero-el"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 });
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setEnviando(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setEnviando(false);
    setEnviado(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <PageTransition>
      <section ref={heroRef} className="relative overflow-hidden bg-lad-black pb-28 pt-36">
        <div className="absolute inset-0">
          <Image src="/img/ai-generated-6a1c47083bfcf.png" alt="Equipo LAD" fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-lad-black via-lad-black/95 to-lad-black/70" />
        </div>
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-lad-red" />
        <div className="container-lad relative z-10">
          <p className="hero-el mb-6 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Carreras</p>
          <h1 className="hero-el heading-xl mb-6 max-w-3xl text-white">Unete a nuestro <span className="text-lad-red">equipo</span></h1>
          <p className="hero-el body-lg mb-10 max-w-xl text-gray-300">Buscamos profesionales apasionados por la salud y el diagnostico clinico de precision.</p>
          <a href="#vacantes" className="hero-el btn-primary">Ver vacantes disponibles</a>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-lad">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Por que nosotros</p>
              <h2 className="heading-lg">Trabaja donde <span className="text-lad-red">importas</span></h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {beneficios.map((beneficio, index) => (
              <ScrollReveal key={beneficio} delay={index * 0.08}>
                <div className="card-hover border border-gray-100 p-8 text-center hover:border-lad-red">
                  <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center bg-lad-red font-display font-black text-white">{index + 1}</div>
                  <p className="font-display text-sm font-bold">{beneficio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="vacantes" className="section-padding bg-lad-gray-light">
        <div className="container-lad grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Vacantes</p>
            <h2 className="heading-lg mb-8">Puestos disponibles</h2>
            <div className="space-y-4">
              {posiciones.map((posicion, index) => (
                <div key={posicion.titulo} className="bg-white">
                  <button type="button" onClick={() => setActivePos(activePos === index ? null : index)} className="flex w-full items-center justify-between p-5 text-left">
                    <span>
                      <span className="block font-display text-lg font-bold">{posicion.titulo}</span>
                      <span className="text-sm text-gray-500">{posicion.area} - {posicion.tipo}</span>
                    </span>
                    <span className="text-2xl text-lad-red">{activePos === index ? "-" : "+"}</span>
                  </button>
                  <AnimatePresence>
                    {activePos === index && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <ul className="space-y-2 border-t border-gray-100 p-5 pt-4">
                          {posicion.req.map((req) => <li key={req} className="text-sm text-gray-600">- {req}</li>)}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-sm md:p-8">
              {enviado ? (
                <div className="py-16 text-center">
                  <h2 className="heading-md mb-4">Postulacion enviada</h2>
                  <p className="text-gray-600">Gracias por tu interes. Revisaremos tu informacion.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5">
                  <h2 className="heading-md">Postulate</h2>
                  <input className="border border-gray-200 p-3" name="nombre" placeholder="Nombre completo" value={formData.nombre} onChange={handleChange} required />
                  <input className="border border-gray-200 p-3" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                  <input className="border border-gray-200 p-3" name="telefono" placeholder="Telefono" value={formData.telefono} onChange={handleChange} />
                  <select className="border border-gray-200 p-3" name="posicion" value={formData.posicion} onChange={handleChange}>
                    <option value="">Posicion de interes</option>
                    {posiciones.map((posicion) => <option key={posicion.titulo}>{posicion.titulo}</option>)}
                  </select>
                  <input className="border border-gray-200 p-3" name="experiencia" placeholder="Anos de experiencia" value={formData.experiencia} onChange={handleChange} />
                  <input className="border border-gray-200 p-3" type="file" accept=".pdf,.doc,.docx" onChange={(event) => setCvFile(event.target.files?.[0] || null)} />
                  {cvFile && <p className="text-xs text-gray-500">Archivo seleccionado: {cvFile.name}</p>}
                  <textarea className="min-h-32 border border-gray-200 p-3" name="mensaje" placeholder="Mensaje" value={formData.mensaje} onChange={handleChange} />
                  <button className="btn-primary" disabled={enviando}>{enviando ? "Enviando..." : "Enviar postulacion"}</button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
