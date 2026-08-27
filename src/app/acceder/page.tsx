import type { Metadata } from "next";
import Link from "next/link";

import ConsultaEstudio from "@/components/eden/ConsultaEstudio";
import { EdenMark } from "@/components/EdenBrand";
import { IconBadge, IconChip } from "@/components/IconBadge";
import { IconEye, IconLock, IconLogin, IconScan, IconShieldCheck, IconUsers } from "@/components/LadIcons";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { isBirthDateRequired } from "@/lib/eden/config";
import { edenPortals } from "@/lib/eden-portals";
import { ICON_COLORS } from "@/lib/icon-palette";

export const metadata: Metadata = {
  title: "Consulta tus estudios | LAD Laboratorio de Apoyo y Diagnóstico",
  description:
    "Consulta el avance de tu estudio y descarga tu reporte de resultados con el folio que te dimos en LAD Laboratorio de Apoyo y Diagnóstico.",
};

// La consulta lee el expediente en vivo desde Eden, así que la página no se
// puede prerenderizar en el build.
export const dynamic = "force-dynamic";

const PORTAL_ICONS = {
  pacs: IconScan,
  management: IconUsers,
  intelligence: IconEye,
  admin: IconLock,
} as const;

export default function AccederPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="hero-dark relative overflow-hidden pb-20 pt-32">
        <div className="hero-noise absolute inset-0" />
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-lad-red" />
        <div className="container-lad relative z-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Consulta de resultados</p>
            <EdenMark size="h-4 w-4" textClassName="text-sm text-gray-400" />
          </div>
          <h1 className="heading-xl mb-4 mt-6 text-white">
            Tus estudios, <span className="text-lad-red">al momento</span>
          </h1>
          <p className="body-lg max-w-2xl text-justify text-gray-300">
            Escribe el folio de tu estudio y consulta en qué etapa va, en qué sucursal se realizó y descarga tu reporte
            firmado en cuanto esté listo. La información viene directo de nuestro expediente clínico, sin necesidad de
            crear una cuenta.
          </p>

          <div className="mt-8 flex flex-col gap-3 border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:gap-4">
            <IconChip color={ICON_COLORS.red} size="h-6 w-6"><IconShieldCheck /></IconChip>
            <p className="text-sm text-gray-300">
              Tu información es confidencial. LAD nunca te pedirá contraseñas ni datos bancarios por teléfono, WhatsApp
              o correo. Si tienes dudas sobre tu reporte,{" "}
              <Link href="/contacto" className="font-bold text-white underline decoration-lad-red underline-offset-4 hover:text-lad-red">
                comunícate con nosotros
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Buscador */}
      <section id="consulta" className="section-padding scroll-mt-24 bg-lad-gray-light">
        <div className="container-lad">
          <ScrollReveal>
            <div className="mb-12 max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Buscar mi estudio</p>
              <h2 className="heading-lg">
                Consulta con tu <span className="text-lad-red">folio</span>
              </h2>
              <p className="body-lg mt-4 text-justify text-gray-500">
                El folio es el identificador que aparece en tu comprobante de estudio. Escríbelo tal cual, incluyendo
                guiones.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <ConsultaEstudio requiereFechaNacimiento={isBirthDateRequired()} />
          </ScrollReveal>
        </div>
      </section>

      {/* Accesos del personal */}
      <section id="personal" className="section-padding scroll-mt-24 bg-white">
        <div className="container-lad">
          <ScrollReveal>
            <div className="mb-10 max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Sólo personal LAD</p>
              <h2 className="heading-md">Acceso al ecosistema eden</h2>
              <p className="mt-3 text-justify text-gray-500">
                Estas plataformas son de uso interno. Si eres paciente, tu consulta se hace arriba con tu folio.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {edenPortals.map((portal, index) => {
              const Icon = PORTAL_ICONS[portal.slug as keyof typeof PORTAL_ICONS];
              return (
                <ScrollReveal key={portal.slug} delay={index * 0.08}>
                  <a
                    href={portal.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-hover flex h-full flex-col justify-between border-2 border-gray-200 bg-white p-6 text-lad-black"
                  >
                    <div>
                      <IconBadge color={ICON_COLORS.red}><Icon /></IconBadge>
                      <h3 className="mb-1 mt-5 font-display text-lg font-black lowercase">
                        eden <span className="font-light">{portal.suffix}</span>
                      </h3>
                      <p className="text-[0.65rem] font-bold uppercase tracking-wider text-lad-red">{portal.resumen}</p>
                    </div>
                    <span className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                      <IconChip color="currentColor" size="h-4 w-4"><IconLogin /></IconChip>
                      Iniciar sesión
                    </span>
                  </a>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-gray-500">
              Si olvidaste tu contraseña o aún no tienes acceso, contacta a tu administrador del sistema.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
