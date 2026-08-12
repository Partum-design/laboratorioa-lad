import type { Metadata } from "next";
import { Suspense } from "react";

import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import PagoEnLineaForm from "@/components/pago/PagoEnLineaForm";
import { IconChip } from "@/components/IconBadge";
import { IconCreditCard, IconLock, IconShieldCheck } from "@/components/LadIcons";
import { ICON_COLORS } from "@/lib/icon-palette";

export const metadata: Metadata = {
  title: "Pago en línea | LAD Laboratorio de Apoyo y Diagnóstico",
  description: "Paga tus estudios de laboratorio en línea con tarjeta, directo y seguro, sin salir del sitio.",
};

export const dynamic = "force-dynamic";

const garantias = [
  { icon: <IconLock />, texto: "Conexión cifrada con Mercado Pago" },
  { icon: <IconShieldCheck />, texto: "LAD nunca ve ni guarda tu tarjeta" },
  { icon: <IconCreditCard />, texto: "Aceptamos las principales tarjetas" },
];

export default function PagoEnLineaPage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden bg-lad-black pb-16 pt-32">
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-lad-red" />
        <div className="container-lad relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Pago en línea</p>
          <h1 className="heading-xl mb-4 mt-6 text-white">
            Paga tu estudio <span className="text-lad-red">directo aquí</span>
          </h1>
          <p className="body-lg max-w-2xl text-justify text-gray-400">
            Captura tus datos bancarios y paga con tarjeta, igual que cualquier compra en línea. Sin WhatsApp, sin
            esperar a que alguien te conteste.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 sm:gap-6">
            {garantias.map((garantia) => (
              <div key={garantia.texto} className="flex items-center gap-2.5 text-sm text-gray-300">
                <IconChip color={ICON_COLORS.red} size="h-5 w-5">{garantia.icon}</IconChip>
                {garantia.texto}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pagar" className="section-padding scroll-mt-24 bg-lad-gray-light">
        <div className="container-lad max-w-2xl">
          <ScrollReveal>
            <Suspense fallback={null}>
              <PagoEnLineaForm />
            </Suspense>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
