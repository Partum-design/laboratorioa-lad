"use client";

import PageTransition from "@/components/PageTransition";
import VideoAuto from "@/components/VideoAuto";
import ScrollReveal from "@/components/ScrollReveal";
import { IconChip } from "@/components/IconBadge";
import { IconClipboard, IconClock, IconCreditCard, IconFilter, IconSearch, IconTag, IconWhatsApp } from "@/components/LadIcons";
import { ICON_COLORS, iconColorAt } from "@/lib/icon-palette";
import { buildWhatsAppLink } from "@/lib/contact";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { categoriasOrden, estudios } from "./estudios-data";

const categorias = ["Todos", ...categoriasOrden];

const INDICACION_LABEL: Record<string, string> = {
  AYUNO: "Ayuno",
  NINGUNA: "Sin preparación",
  ESPECIALES: "Indicaciones especiales",
  "NO CALCIO": "Sin calcio previo",
  "VEJIGA LLENA": "Vejiga llena",
};

const PAGE_SIZE = 30;

function whatsappLinkFor(nombre: string, precio: string) {
  return buildWhatsAppLink(
    `Hola, quiero preguntar sobre el estudio "${nombre}" (${precio}). ¿Me pueden dar más información?`
  );
}

function pagoLinkFor(nombre: string, precio: string) {
  const monto = precio.replace(/[^0-9.]/g, "");
  return `/pago-en-linea?estudio=${encodeURIComponent(nombre)}&precio=${encodeURIComponent(monto)}`;
}

export default function EstudiosPage() {
  const [activeCat, setActiveCat] = useState("Todos");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    return estudios.filter((e) => {
      const matchesCat = activeCat === "Todos" || e.cat === activeCat;
      const matchesQuery = q === "" || e.nombre.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [activeCat, query]);

  const mostrados = filtrados.slice(0, visible);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden pb-24 pt-32">
        <div className="absolute inset-0">
          <VideoAuto src="/vids/estudios/hero.mp4" className="h-full w-full object-cover opacity-25 mix-blend-luminosity" />
          <div className="hero-dark absolute inset-0" />
          <div className="hero-noise absolute inset-0" />
        </div>
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-lad-red" />
        <div className="container-lad relative z-10">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Catálogo</p>
          <h1 className="heading-xl mb-4 text-white">Nuestros <span className="text-lad-red">Estudios</span></h1>
          <p className="body-lg max-w-2xl text-justify text-gray-300">
            Consulta nuestro catálogo de más de 500 estudios con precios e indicaciones de preparación. ¿No
            encuentras el tuyo o tienes dudas? Pregúntanos directo por WhatsApp.
          </p>
          <a
            href={buildWhatsAppLink("Hola, tengo una duda sobre un estudio de laboratorio. ¿Me pueden ayudar?")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a]"
          >
            <IconWhatsApp className="h-5 w-5" />
            Preguntar por WhatsApp
          </a>
        </div>
      </section>

      {/* Pago en línea */}
      <section className="bg-lad-red">
        <div className="container-lad flex flex-col items-center gap-4 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <IconChip color="#ffffff" size="h-6 w-6"><IconCreditCard /></IconChip>
            <p className="font-display text-lg font-bold text-white sm:text-xl">
              Paga en línea y obtén un descuento especial.
            </p>
          </div>
          <Link href="/pago-en-linea" className="btn-white shrink-0">
            Quiero pagar en línea
          </Link>
        </div>
      </section>

      {/* Catálogo de estudios */}
      <section id="catalogo" className="section-padding scroll-mt-24 bg-white">
        <div className="container-lad">
          <div className="mb-8 flex items-center gap-3">
            <IconChip color={iconColorAt(5)} size="h-5 w-5"><IconFilter /></IconChip>
            <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Filtrar por categoría</span>
          </div>
          <div className="mb-6 flex flex-wrap gap-3">
            {categorias.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => { setActiveCat(cat); setVisible(PAGE_SIZE); }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${activeCat === cat ? "bg-lad-red text-white" : "bg-lad-gray-light text-lad-black hover:bg-gray-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative mb-10 max-w-md">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <IconChip color={ICON_COLORS.sky} size="h-4 w-4"><IconSearch /></IconChip>
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setVisible(PAGE_SIZE); }}
              placeholder="Buscar estudio por nombre..."
              className="w-full border border-gray-200 py-3 pl-12 pr-4 text-sm focus:border-lad-red focus:outline-none"
            />
          </div>

          <p className="mb-6 text-sm text-gray-500">{filtrados.length} estudio{filtrados.length === 1 ? "" : "s"} encontrado{filtrados.length === 1 ? "" : "s"}</p>

          <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {mostrados.map((estudio) => (
                <motion.article
                  key={estudio.nombre}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="flex flex-col border border-gray-100 p-6 hover:border-lad-red transition-colors"
                >
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-lad-red">{estudio.cat}</p>
                  <h3 className="mb-3 font-display text-xl font-bold">{estudio.nombre}</h3>
                  <p className="mb-5 text-justify text-sm leading-relaxed text-gray-600">{estudio.desc}</p>
                  <div className="mt-auto grid grid-cols-3 gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><IconChip color={ICON_COLORS.sky} size="h-4 w-4"><IconClock /></IconChip> {estudio.tipo}</span>
                    <span className="flex items-center gap-1"><IconChip color={ICON_COLORS.amber} size="h-4 w-4"><IconClipboard /></IconChip> {INDICACION_LABEL[estudio.indicacion] ?? estudio.indicacion}</span>
                    <span className="flex items-center gap-1 font-bold text-lad-red"><IconChip color={ICON_COLORS.red} size="h-4 w-4"><IconTag /></IconChip> {estudio.precio}</span>
                  </div>
                  <Link
                    href={pagoLinkFor(estudio.nombre, estudio.precio)}
                    className="mt-4 flex items-center justify-center gap-2 bg-lad-red py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-lad-red-dark"
                  >
                    <IconCreditCard className="h-4 w-4" />
                    Pagar este estudio
                  </Link>
                  <a
                    href={whatsappLinkFor(estudio.nombre, estudio.precio)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-2 border border-[#25D366] py-2.5 text-xs font-bold uppercase tracking-wider text-[#128C4A] transition hover:bg-[#25D366] hover:text-white"
                  >
                    <IconWhatsApp className="h-4 w-4" />
                    Preguntar por WhatsApp
                  </a>
                  <Link
                    href={`/contacto?estudio=${encodeURIComponent(estudio.nombre)}#agenda`}
                    className="mt-2 text-center text-[11px] font-semibold text-gray-400 underline-offset-2 hover:text-lad-red hover:underline"
                  >
                    o pregunta con el formulario de contacto
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {visible < filtrados.length && (
            <div className="mt-10 text-center">
              <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-outline">
                Ver más estudios
              </button>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
