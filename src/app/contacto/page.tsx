"use client";

import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-lad-red">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-lad-red">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-lad-red">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-lad-red">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
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
function IconCheckCircle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 h-16 w-16 text-lad-red">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

const horarios = [
  { dia: "Lunes - Viernes", hora: "7:00 AM - 6:00 PM" },
  { dia: "Sábado", hora: "7:00 AM - 2:00 PM" },
  { dia: "Domingo", hora: "Cerrado" },
];

export default function ContactoPage() {
  const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "", servicio: "", fecha: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current.querySelectorAll(".form-field"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.4 },
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
      <section className="relative overflow-hidden bg-lad-black pb-20 pt-32">
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline preload="auto" className="h-full w-full object-cover opacity-30">
            <source src="/vids/contacto/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-lad-black/90 via-lad-black/70 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-lad-red" />
        <div className="container-lad relative z-10">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Contáctanos</p>
          <h1 className="heading-xl mb-4 text-white">Agenda tu <span className="text-lad-red">cita</span></h1>
          <p className="body-lg max-w-xl text-justify text-gray-400">
            Envíanos tus datos y nos pondremos en contacto contigo a la brevedad para confirmar tu cita.
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section className="section-padding bg-white">
        <div className="container-lad grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Información de contacto */}
          <div className="space-y-8 lg:col-span-2">
            <ScrollReveal direction="left">
              <h2 className="heading-md mb-6">Información de <span className="text-lad-red">contacto</span></h2>
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <IconMapPin />
                  <div>
                    <p className="font-bold text-lad-black">Dirección</p>
                    <p className="text-gray-600">Calle Principal #123, Col. Centro, Ciudad</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconPhone />
                  <div>
                    <p className="font-bold text-lad-black">Teléfono</p>
                    <p className="text-gray-600">+52 (000) 000-0000</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconMail />
                  <div>
                    <p className="font-bold text-lad-black">Correo electrónico</p>
                    <p className="text-gray-600">contacto@lad.com.mx</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-100 pt-8">
                <div className="mb-4 flex items-center gap-2">
                  <IconClock />
                  <h3 className="font-display text-lg font-bold">Horario de atención</h3>
                </div>
                {horarios.map((h) => (
                  <div key={h.dia} className="flex justify-between border-b border-gray-50 py-2 text-sm">
                    <span className="text-gray-600">{h.dia}</span>
                    <span className={h.hora === "Cerrado" ? "text-gray-400" : "font-semibold text-lad-red"}>{h.hora}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex h-48 items-center justify-center bg-lad-gray-light text-sm font-bold text-gray-400">
                <div className="flex flex-col items-center gap-2">
                  <IconMapPin />
                  <span>Mapa próximamente</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-3">
            <ScrollReveal direction="right">
              <form ref={formRef} onSubmit={handleSubmit} className="border border-gray-100 bg-white p-6 shadow-sm md:p-10">
                {enviado ? (
                  <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
                    <IconCheckCircle />
                    <h2 className="heading-md mb-4 text-lad-black">¡Solicitud enviada!</h2>
                    <p className="text-justify text-gray-600">Gracias por contactarnos. Nuestro equipo te contactará pronto para confirmar tu cita.</p>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <input className="form-field border border-gray-200 p-3" name="nombre" placeholder="Nombre completo" value={formData.nombre} onChange={handleChange} required />
                    <input className="form-field border border-gray-200 p-3" name="email" type="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
                    <input className="form-field border border-gray-200 p-3" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
                    <input className="form-field border border-gray-200 p-3" name="fecha" type="date" value={formData.fecha} onChange={handleChange} />
                    <select className="form-field border border-gray-200 p-3 md:col-span-2" name="servicio" value={formData.servicio} onChange={handleChange}>
                      <option value="">Servicio de interés</option>
                      <option>Análisis clínicos</option>
                      <option>Paquete preventivo</option>
                      <option>Convenio empresarial</option>
                    </select>
                    <textarea className="form-field min-h-36 border border-gray-200 p-3 md:col-span-2" name="mensaje" placeholder="Mensaje o comentarios adicionales" value={formData.mensaje} onChange={handleChange} />
                    <button className="btn-primary flex items-center justify-center gap-2 md:col-span-2" disabled={enviando}>
                      {enviando ? "Enviando..." : (
                        <>
                          <IconSend />
                          Enviar solicitud
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
