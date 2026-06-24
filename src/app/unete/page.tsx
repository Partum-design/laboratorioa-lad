"use client";

import PageTransition from "@/components/PageTransition";
import VideoAuto from "@/components/VideoAuto";
import ScrollReveal from "@/components/ScrollReveal";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function IconGraduate() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconTrendUp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconSmile() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
      <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}
function IconChevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-lad-red">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconPaperclip() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-lad-red">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}
function IconSend() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

const posiciones = [
  {
    titulo: "Químico Farmacobiólogo (QFB)",
    area: "Laboratorio Clínico",
    tipo: "Tiempo completo",
    req: ["Cédula profesional vigente", "2+ años de experiencia", "Manejo de analizadores automatizados", "Disponibilidad para rotación de turnos"],
  },
  {
    titulo: "Técnico de Laboratorio",
    area: "Laboratorio Clínico",
    tipo: "Tiempo completo",
    req: ["Carrera técnica en área de salud", "Experiencia en toma de muestras", "Trabajo en equipo", "Actitud de servicio al paciente"],
  },
  {
    titulo: "Recepcionista / Atención al Paciente",
    area: "Área Administrativa",
    tipo: "Tiempo completo",
    req: ["Bachillerato o superior", "Excelente trato al cliente", "Manejo básico de computadora"],
  },
  {
    titulo: "Especialista en Microbiología",
    area: "Microbiología",
    tipo: "Tiempo completo",
    req: ["Especialidad en Microbiología Clínica", "Experiencia en cultivos y antibiogramas", "Actualización continua en la materia"],
  },
];

const beneficios = [
  { icon: <IconShield />, label: "Seguro de salud" },
  { icon: <IconGraduate />, label: "Capacitación continua" },
  { icon: <IconClock />, label: "Horarios flexibles" },
  { icon: <IconTrendUp />, label: "Crecimiento profesional" },
  { icon: <IconHeart />, label: "Prestaciones superiores" },
  { icon: <IconSmile />, label: "Buen ambiente laboral" },
];

export default function UnetePage() {
  const [activePos, setActivePos] = useState<number | null>(0);
  const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "", posicion: "", experiencia: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".hero-el"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 },
      );
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
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden bg-lad-black pb-28 pt-36">
        <div className="absolute inset-0">
          <VideoAuto src="/vids/unete/hero.mp4" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-lad-black via-lad-black/95 to-lad-black/70" />
        </div>
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-lad-red" />
        <div className="container-lad relative z-10">
          <p className="hero-el mb-6 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Carreras</p>
          <h1 className="hero-el heading-xl mb-6 max-w-3xl text-white">
            Únete a nuestro <span className="text-lad-red">equipo</span>
          </h1>
          <p className="hero-el body-lg mb-10 max-w-xl text-justify text-gray-300">
            Buscamos profesionales apasionados por la salud y el diagnóstico clínico de precisión. Tu talento hace la diferencia.
          </p>
          <a href="#vacantes" className="hero-el btn-primary inline-flex items-center gap-2">
            <IconChevron />
            Ver vacantes disponibles
          </a>
        </div>
      </section>

      {/* Beneficios */}
      <section className="section-padding bg-white">
        <div className="container-lad">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Por qué nosotros</p>
              <h2 className="heading-lg">Trabaja donde <span className="text-lad-red">importas</span></h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {beneficios.map((b, index) => (
              <ScrollReveal key={b.label} delay={index * 0.08}>
                <div className="card-hover border border-gray-100 p-8 text-center hover:border-lad-red">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-lad-red">
                    {b.icon}
                  </div>
                  <p className="font-display text-sm font-bold">{b.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vacantes + Formulario */}
      <section id="vacantes" className="section-padding bg-lad-gray-light">
        <div className="container-lad grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Accordion de vacantes */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Vacantes</p>
            <h2 className="heading-lg mb-8">Puestos disponibles</h2>
            <div className="space-y-4">
              {posiciones.map((posicion, index) => (
                <div key={posicion.titulo} className="bg-white">
                  <button
                    type="button"
                    onClick={() => setActivePos(activePos === index ? null : index)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <span>
                      <span className="block font-display text-lg font-bold">{posicion.titulo}</span>
                      <span className="text-sm text-gray-500">{posicion.area} · {posicion.tipo}</span>
                    </span>
                    <span className={`text-lad-red transition-transform ${activePos === index ? "rotate-180" : ""}`}>
                      <IconChevron />
                    </span>
                  </button>
                  <AnimatePresence>
                    {activePos === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-2 border-t border-gray-100 p-5 pt-4">
                          {posicion.req.map((r) => (
                            <li key={r} className="flex items-center gap-2 text-sm text-gray-600">
                              <IconCheck /> {r}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-sm md:p-8">
              {enviado ? (
                <div className="py-16 text-center">
                  <h2 className="heading-md mb-4">¡Postulación enviada!</h2>
                  <p className="text-justify text-gray-600">Gracias por tu interés en LAD. Revisaremos tu información y nos pondremos en contacto contigo.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5">
                  <h2 className="heading-md">Postúlate</h2>
                  <input className="border border-gray-200 p-3" name="nombre" placeholder="Nombre completo" value={formData.nombre} onChange={handleChange} required />
                  <input className="border border-gray-200 p-3" name="email" type="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
                  <input className="border border-gray-200 p-3" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
                  <select className="border border-gray-200 p-3" name="posicion" value={formData.posicion} onChange={handleChange}>
                    <option value="">Posición de interés</option>
                    {posiciones.map((p) => <option key={p.titulo}>{p.titulo}</option>)}
                  </select>
                  <input className="border border-gray-200 p-3" name="experiencia" placeholder="Años de experiencia" value={formData.experiencia} onChange={handleChange} />
                  <label className="flex cursor-pointer items-center gap-3 border border-gray-200 p-3 text-sm text-gray-500 hover:border-lad-red transition-colors">
                    <IconPaperclip />
                    {cvFile ? cvFile.name : "Adjuntar CV (.pdf, .doc, .docx)"}
                    <input className="hidden" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCvFile(e.target.files?.[0] || null)} />
                  </label>
                  <textarea className="min-h-32 border border-gray-200 p-3" name="mensaje" placeholder="Mensaje o comentarios adicionales" value={formData.mensaje} onChange={handleChange} />
                  <button className="btn-primary flex items-center justify-center gap-2" disabled={enviando}>
                    {enviando ? "Enviando..." : (
                      <>
                        <IconSend />
                        Enviar postulación
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
