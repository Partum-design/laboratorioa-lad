"use client";

import PageTransition from "@/components/PageTransition";
import VideoAuto from "@/components/VideoAuto";
import ScrollReveal from "@/components/ScrollReveal";
import { IconBadge, IconChip } from "@/components/IconBadge";
import { ICON_COLORS, iconColorAt } from "@/lib/icon-palette";
import { buildWhatsAppLink, LAD_PHONE_DISPLAY, LAD_TEL_LINK, LAD_WHATSAPP_LINK } from "@/lib/contact";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path fillRule="evenodd" d="M1.5 4.5c0-1.036.84-1.875 1.875-1.875h3.375c.621 0 1.125.504 1.125 1.125v3.375c0 .621-.504 1.125-1.125 1.125h-1.5a.375.375 0 0 0-.375.375c0 7.04 5.71 12.75 12.75 12.75a.375.375 0 0 0 .375-.375v-1.5c0-.621.504-1.125 1.125-1.125h3.375c.621 0 1.125.504 1.125 1.125v3.375c0 1.036-.84 1.875-1.875 1.875h-1.5C9.708 22.5 1.5 14.292 1.5 4.5v-1.5Z" clipRule="evenodd" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.75 4.5a.75.75 0 0 0-1.5 0V12c0 .284.152.547.398.69l4.5 2.625a.75.75 0 1 0 .755-1.297l-4.153-2.424V6.75Z" clipRule="evenodd" />
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
function IconCheckCircle() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-9 w-9">
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  );
}

const horarios = [
  { dia: "Lunes a viernes", hora: "7:00 am a 6:00 pm" },
  { dia: "Sábado", hora: "7:00 am a 2:00 pm" },
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
    const message = [
      "Hola, quiero agendar una cita en LAD.",
      formData.nombre && `Nombre: ${formData.nombre}`,
      formData.telefono && `Telefono: ${formData.telefono}`,
      formData.email && `Correo: ${formData.email}`,
      formData.servicio && `Servicio: ${formData.servicio}`,
      formData.fecha && `Fecha tentativa: ${formData.fecha}`,
      formData.mensaje && `Mensaje: ${formData.mensaje}`,
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
      <section className="relative overflow-hidden bg-lad-black pb-20 pt-32">
        <div className="absolute inset-0">
          <VideoAuto src="/vids/contacto/hero.mp4" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-lad-black/90 via-lad-black/70 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-lad-red" />
        <div className="container-lad relative z-10">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Contáctanos</p>
          <h1 className="heading-xl mb-4 text-white">Agenda tu <span className="text-lad-red">cita</span></h1>
          <p className="body-lg max-w-xl text-justify text-gray-400">
            Escríbenos por WhatsApp o déjanos tus datos. Te orientamos con horarios, muestras y preparación antes de tu visita.
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section id="agenda" className="section-padding scroll-mt-24 bg-white">
        <div className="container-lad grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Información de contacto */}
          <div className="space-y-8 lg:col-span-2">
            <ScrollReveal direction="left">
              <h2 className="heading-md mb-6">Información de <span className="text-lad-red">contacto</span></h2>
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <IconChip color={iconColorAt(0)}><IconMapPin /></IconChip>
                  <div>
                    <p className="font-bold text-lad-black">Ubicación</p>
                    <p className="text-gray-600">Te compartimos la ubicación exacta por WhatsApp al confirmar tu cita.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconChip color={iconColorAt(1)}><IconPhone /></IconChip>
                  <div>
                    <p className="font-bold text-lad-black">Teléfono</p>
                    <a href={LAD_TEL_LINK} className="text-gray-600 transition hover:text-lad-red">{LAD_PHONE_DISPLAY}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconChip color={iconColorAt(2)}><IconPhone /></IconChip>
                  <div>
                    <p className="font-bold text-lad-black">WhatsApp</p>
                    <a href={LAD_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-600 transition hover:text-lad-red">
                      Resolver dudas o agendar
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-100 pt-8">
                <div className="mb-4 flex items-center gap-2">
                  <IconChip color={iconColorAt(3)} size="h-5 w-5"><IconClock /></IconChip>
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
                  <IconChip color={iconColorAt(0)} size="h-7 w-7"><IconMapPin /></IconChip>
                  <span>Ubicación disponible al agendar</span>
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
                    <IconBadge color={ICON_COLORS.green} className="mx-auto mb-4 h-16 w-16 rounded-full">
                      <IconCheckCircle />
                    </IconBadge>
                    <h2 className="heading-md mb-4 text-lad-black">WhatsApp abierto</h2>
                    <p className="text-justify text-gray-600">Tu mensaje quedó listo para enviarse. Si no se abrió la ventana, usa el botón flotante de WhatsApp.</p>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <input className="form-field border border-gray-200 p-3" name="nombre" placeholder="Nombre completo" value={formData.nombre} onChange={handleChange} required />
                    <input className="form-field border border-gray-200 p-3" name="email" type="email" placeholder="Correo electrónico (opcional)" value={formData.email} onChange={handleChange} />
                    <input className="form-field border border-gray-200 p-3" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
                    <input className="form-field border border-gray-200 p-3" name="fecha" type="date" value={formData.fecha} onChange={handleChange} />
                    <select className="form-field border border-gray-200 p-3 md:col-span-2" name="servicio" value={formData.servicio} onChange={handleChange}>
                      <option value="">Servicio de interés</option>
                      <option>Análisis clínicos</option>
                      <option>Paquete preventivo</option>
                      <option>Convenio empresarial</option>
                    </select>
                    <textarea className="form-field min-h-36 border border-gray-200 p-3 md:col-span-2" name="mensaje" placeholder="Mensaje o comentarios adicionales" value={formData.mensaje} onChange={handleChange} />
                    <button className="btn-primary flex items-center justify-center gap-2 md:col-span-2" disabled={enviando}>
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
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
