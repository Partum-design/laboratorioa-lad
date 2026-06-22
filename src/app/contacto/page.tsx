"use client";

import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

const horarios = [
  { dia: "Lunes - Viernes", hora: "7:00 AM - 6:00 PM" },
  { dia: "Sabado", hora: "7:00 AM - 2:00 PM" },
  { dia: "Domingo", hora: "Cerrado" },
];

export default function ContactoPage() {
  const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "", servicio: "", fecha: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current.querySelectorAll(".form-field"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.4 });
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
      <section className="relative overflow-hidden bg-lad-black pb-20 pt-32">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-lad-red" />
        <div className="container-lad relative z-10">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Contactanos</p>
          <h1 className="heading-xl mb-4 text-white">Agenda tu <span className="text-lad-red">cita</span></h1>
          <p className="body-lg max-w-xl text-gray-400">Envianos tus datos y nos pondremos en contacto contigo a la brevedad.</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-lad grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-2">
            <ScrollReveal direction="left">
              <h2 className="heading-md mb-6">Informacion de <span className="text-lad-red">contacto</span></h2>
              <div className="space-y-5 text-sm">
                <p><strong>Direccion:</strong><br />Calle Principal #123, Col. Centro, Ciudad</p>
                <p><strong>Telefono:</strong><br />+52 (000) 000-0000</p>
                <p><strong>Email:</strong><br />contacto@lad.com.mx</p>
              </div>
              <div className="mt-8 border-t border-gray-100 pt-8">
                <h3 className="mb-4 font-display text-lg font-bold">Horario de atencion</h3>
                {horarios.map((h) => (
                  <div key={h.dia} className="flex justify-between border-b border-gray-50 py-2 text-sm">
                    <span className="text-gray-600">{h.dia}</span>
                    <span className={h.hora === "Cerrado" ? "text-gray-400" : "font-semibold text-lad-red"}>{h.hora}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex h-48 items-center justify-center bg-lad-gray-light text-sm font-bold text-gray-400">Mapa</div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-3">
            <ScrollReveal direction="right">
              <form ref={formRef} onSubmit={handleSubmit} className="border border-gray-100 bg-white p-6 shadow-sm md:p-10">
                {enviado ? (
                  <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
                    <h2 className="heading-md mb-4 text-lad-black">Solicitud enviada</h2>
                    <p className="text-gray-600">Gracias. Nuestro equipo te contactara pronto.</p>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <input className="form-field border border-gray-200 p-3" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
                    <input className="form-field border border-gray-200 p-3" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input className="form-field border border-gray-200 p-3" name="telefono" placeholder="Telefono" value={formData.telefono} onChange={handleChange} />
                    <input className="form-field border border-gray-200 p-3" name="fecha" type="date" value={formData.fecha} onChange={handleChange} />
                    <select className="form-field border border-gray-200 p-3 md:col-span-2" name="servicio" value={formData.servicio} onChange={handleChange}>
                      <option value="">Servicio de interes</option>
                      <option>Analisis clinicos</option>
                      <option>Paquete preventivo</option>
                      <option>Convenio empresarial</option>
                    </select>
                    <textarea className="form-field min-h-36 border border-gray-200 p-3 md:col-span-2" name="mensaje" placeholder="Mensaje" value={formData.mensaje} onChange={handleChange} />
                    <button className="btn-primary md:col-span-2" disabled={enviando}>{enviando ? "Enviando..." : "Enviar solicitud"}</button>
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
