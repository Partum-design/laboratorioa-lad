"use client";

import PageTransition from "@/components/PageTransition";
import VideoAuto from "@/components/VideoAuto";
import ScrollReveal from "@/components/ScrollReveal";
import { IconChip } from "@/components/IconBadge";
import { IconCheck, IconClock, IconDroplet, IconFilter, IconSearch, IconTag } from "@/components/LadIcons";
import { ICON_COLORS, iconColorAt } from "@/lib/icon-palette";
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

const paquetes = [
  { nombre: "Paquete Básico", precio: "$450", estudios: ["Biometría Hemática", "Glucosa", "Química Sanguínea 6", "EGO"], badge: "" },
  { nombre: "Paquete Completo", precio: "$1,200", estudios: ["Biometría Hemática", "Perfil Lipídico", "Perfil Hepático", "Función Renal", "Glucosa", "EGO", "TSH"], badge: "Más popular" },
  { nombre: "Paquete Premium", precio: "$2,800", estudios: ["Todo el Paquete Completo", "Hormonas Completo", "Marcadores Tumorales", "Perfil Cardíaco", "Cultivos"], badge: "Completo" },
];

const PAGE_SIZE = 30;

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
      <section className="relative overflow-hidden bg-lad-black pb-24 pt-32">
        <div className="absolute inset-0">
          <VideoAuto src="/vids/estudios/hero.mp4" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-lad-black/90 via-lad-black/70 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-lad-red" />
        <div className="container-lad relative z-10">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Catálogo</p>
          <h1 className="heading-xl mb-4 text-white">Nuestros <span className="text-lad-red">Estudios</span></h1>
          <p className="body-lg max-w-2xl text-justify text-gray-400">Consulta nuestro catálogo completo de {estudios.length} estudios con precios e indicaciones de preparación. Si tienes dudas, agenda por WhatsApp y te orientamos antes de venir.</p>
        </div>
      </section>

      {/* Paquetes */}
      <section id="paquetes" className="section-padding scroll-mt-24 bg-lad-gray-light">
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
                        <IconChip color={ICON_COLORS.green} size="h-4 w-4"><IconCheck /></IconChip> {e}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contacto#agenda" className={index === 1 ? "btn-primary w-full text-center block" : "btn-outline w-full text-center block"}>
                    Solicitar paquete
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
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
                  className="border border-gray-100 p-6 hover:border-lad-red transition-colors"
                >
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-lad-red">{estudio.cat}</p>
                  <h3 className="mb-3 font-display text-xl font-bold">{estudio.nombre}</h3>
                  <p className="mb-5 text-justify text-sm leading-relaxed text-gray-600">{estudio.desc}</p>
                  <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><IconChip color={ICON_COLORS.sky} size="h-4 w-4"><IconClock /></IconChip> {estudio.tipo}</span>
                    <span className="flex items-center gap-1"><IconChip color={ICON_COLORS.amber} size="h-4 w-4"><IconDroplet /></IconChip> {INDICACION_LABEL[estudio.indicacion] ?? estudio.indicacion}</span>
                    <span className="flex items-center gap-1 font-bold text-lad-red"><IconChip color={ICON_COLORS.red} size="h-4 w-4"><IconTag /></IconChip> {estudio.precio}</span>
                  </div>
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
