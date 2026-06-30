"use client";

import PageTransition from "@/components/PageTransition";
import VideoAuto from "@/components/VideoAuto";
import ScrollReveal from "@/components/ScrollReveal";
import { IconBadge, IconChip } from "@/components/IconBadge";
import { iconColorAt } from "@/lib/icon-palette";
import { buildWhatsAppLink } from "@/lib/contact";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
      <path d="M12.001 4.529c2.349-2.532 6.066-2.532 8.413 0 2.346 2.531 2.346 6.638 0 9.17l-7.55 8.135a1.125 1.125 0 0 1-1.652 0l-7.55-8.135c-2.346-2.531-2.346-6.638 0-9.17 2.347-2.532 6.064-2.532 8.412 0L12 4.609l.001-.08Z" />
    </svg>
  );
}
function IconGraduate() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
      <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.949 49.949 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.009 50.009 0 0 0 7.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.129 56.129 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
      <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 0 1-.46.71 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286A48.6 48.6 0 0 1 6 13.18v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 0 0 .551-1.608 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.668 2.25 2.25 0 0 0 2.12 0Z" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.75 4.5a.75.75 0 0 0-1.5 0V12c0 .284.152.547.398.69l4.5 2.625a.75.75 0 1 0 .755-1.297l-4.153-2.424V6.75Z" clipRule="evenodd" />
    </svg>
  );
}
function IconTrendUp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
      <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.432l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.483a11.2 11.2 0 0 0-5.45 5.174.75.75 0 0 1-1.199.19L9 12.31l-6.22 6.22a.75.75 0 1 1-1.06-1.06l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.605a12.694 12.694 0 0 1 5.68-4.973l1.086-.484-4.251-1.631a.75.75 0 0 1-.432-.97Z" clipRule="evenodd" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Z" clipRule="evenodd" />
    </svg>
  );
}
function IconSmile() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
      <path fillRule="evenodd" d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21ZM8.625 9.75a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Zm7.875-1.125a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Zm-7.069 7.143a.75.75 0 1 0-1.214.882A5.984 5.984 0 0 0 12 18.75a5.984 5.984 0 0 0 4.83-2.45.75.75 0 0 0-1.214-.881A4.484 4.484 0 0 1 12 17.25a4.484 4.484 0 0 1-3.616-1.482Z" clipRule="evenodd" />
    </svg>
  );
}
function IconChevron() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M5.25 7.5l6.75 6.75 6.75-6.75H5.25Z" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0 text-lad-red">
      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 0 1 1.04-.208Z" clipRule="evenodd" />
    </svg>
  );
}
function IconPaperclip() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-lad-red">
      <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 0 0-3.182 0l-10.94 10.94a3.75 3.75 0 1 0 5.304 5.303l7.693-7.693a.75.75 0 0 1 1.06 1.06l-7.693 7.693a5.25 5.25 0 1 1-7.424-7.424l10.939-10.94a3.75 3.75 0 1 1 5.303 5.304L9.097 18.835a2.25 2.25 0 0 1-3.188-3.169L13.72 7.846a.75.75 0 0 1 1.06 1.061l-7.81 7.81a.75.75 0 0 0 1.054 1.068L18.97 6.84a2.25 2.25 0 0 0 0-3.182Z" clipRule="evenodd" />
    </svg>
  );
}
function IconSend() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
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
    const message = [
      "Hola, quiero postularme a LAD.",
      formData.nombre && `Nombre: ${formData.nombre}`,
      formData.telefono && `Telefono: ${formData.telefono}`,
      formData.email && `Correo: ${formData.email}`,
      formData.posicion && `Posicion: ${formData.posicion}`,
      formData.experiencia && `Experiencia: ${formData.experiencia}`,
      formData.mensaje && `Mensaje: ${formData.mensaje}`,
      cvFile && `CV: ${cvFile.name}. Lo adjunto en este chat.`,
    ].filter(Boolean).join("\n");

    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    await new Promise((resolve) => setTimeout(resolve, 400));
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
            Buscamos personas cuidadosas, puntuales y con buen trato al paciente. Si quieres crecer en diagnóstico clínico, revisa las vacantes.
          </p>
          <a href="#vacantes" className="hero-el btn-primary inline-flex items-center gap-2">
            <IconChip color="#ffffff" size="h-5 w-5"><IconChevron /></IconChip>
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
                  <IconBadge color={iconColorAt(index)} className="mx-auto mb-4 h-12 w-12">
                    {b.icon}
                  </IconBadge>
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
                      <IconChip color={iconColorAt(index)} size="h-5 w-5"><IconChevron /></IconChip>
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
                              <IconChip color={iconColorAt(2)} size="h-4 w-4"><IconCheck /></IconChip> {r}
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
                  <h2 className="heading-md mb-4">WhatsApp abierto</h2>
                  <p className="text-justify text-gray-600">Tu mensaje quedó listo. Si agregaste CV, adjúntalo en el chat antes de enviarlo.</p>
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
                    <IconChip color={iconColorAt(4)} size="h-4 w-4"><IconPaperclip /></IconChip>
                    {cvFile ? cvFile.name : "Adjuntar CV (.pdf, .doc, .docx)"}
                    <input className="hidden" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCvFile(e.target.files?.[0] || null)} />
                  </label>
                  <textarea className="min-h-32 border border-gray-200 p-3" name="mensaje" placeholder="Mensaje o comentarios adicionales" value={formData.mensaje} onChange={handleChange} />
                  <button className="btn-primary flex items-center justify-center gap-2" disabled={enviando}>
                    {enviando ? "Abriendo WhatsApp..." : (
                      <>
                        <IconChip color="#ffffff" size="h-4 w-4"><IconSend /></IconChip>
                        Enviar por WhatsApp
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
