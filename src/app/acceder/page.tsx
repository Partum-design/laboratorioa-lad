"use client";

import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { EdenMark } from "@/components/EdenBrand";
import { IconBadge, IconChip } from "@/components/IconBadge";
import { IconEye, IconLock, IconLogin, IconScan, IconShieldCheck, IconUsers } from "@/components/LadIcons";
import { ICON_COLORS } from "@/lib/icon-palette";
import { edenPortals } from "@/lib/eden-portals";
import Link from "next/link";

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
      <section className="relative overflow-hidden bg-lad-black pb-20 pt-32">
        <div className="absolute bottom-0 left-0 top-0 w-1 bg-lad-red" />
        <div className="container-lad relative z-10">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Portal del personal</p>
          <h1 className="heading-xl mb-4 text-white">
            Acceder al <span className="text-lad-red">ecosistema Eden</span>
          </h1>
          <p className="body-lg max-w-2xl text-justify text-gray-400">
            Estos accesos son exclusivos para el personal de LAD Laboratorio de Apoyo y Diagnóstico. Cada botón te
            lleva directo a la pantalla de inicio de sesión de esa plataforma: ten a la mano tu correo y tu
            contraseña de trabajo.
          </p>

          <div className="mt-8 flex flex-col gap-3 border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:gap-4">
            <IconChip color={ICON_COLORS.red} size="h-6 w-6"><IconShieldCheck /></IconChip>
            <p className="text-sm text-gray-300">
              ¿Eres paciente y buscas tus resultados o quieres agendar una cita?{" "}
              <Link href="/contacto" className="font-bold text-white underline decoration-lad-red underline-offset-4 hover:text-lad-red">
                Ve a Contacto
              </Link>
              , esta sección no es para pacientes.
            </p>
          </div>
        </div>
      </section>

      {/* Guía rápida */}
      <section className="section-padding scroll-mt-24 bg-lad-gray-light">
        <div className="container-lad">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-lad-red">Cómo entrar</p>
              <h2 className="heading-lg">Elige la plataforma que <span className="text-lad-red">necesitas</span></h2>
              <p className="body-lg mx-auto mt-4 max-w-2xl text-justify text-gray-500">
                Cada plataforma es para una tarea distinta. Si no sabes cuál usar, guíate por la descripción de cada
                tarjeta o pregunta a tu jefe de área.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {edenPortals.map((portal, index) => {
              const Icon = PORTAL_ICONS[portal.slug as keyof typeof PORTAL_ICONS];
              return (
                <ScrollReveal key={portal.slug} delay={index * 0.1}>
                  <div className="card-hover flex h-full flex-col justify-between border-2 border-gray-200 bg-lad-black p-8 text-white">
                    <div>
                      <div className="mb-6 flex items-center justify-between">
                        <IconBadge color={ICON_COLORS.red}><Icon /></IconBadge>
                        <EdenMark suffix={portal.suffix} size="h-4 w-4" textClassName="text-sm text-gray-300" />
                      </div>
                      <h3 className="mb-2 font-display text-2xl font-black lowercase">
                        eden <span className="font-light">{portal.suffix}</span>
                      </h3>
                      <p className="mb-4 text-xs font-bold uppercase tracking-wider text-lad-red">{portal.resumen}</p>
                      <p className="mb-8 text-justify text-sm leading-relaxed text-gray-400">{portal.detalle}</p>
                    </div>
                    <a
                      href={portal.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center justify-center gap-2"
                    >
                      <IconChip color="#ffffff" size="h-4 w-4"><IconLogin /></IconChip>
                      Iniciar sesión
                    </a>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-12 max-w-2xl text-center text-xs text-gray-500">
              Si olvidaste tu contraseña o no tienes acceso todavía, contacta a tu administrador del sistema. LAD no
              solicita contraseñas por teléfono, WhatsApp ni correo.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </PageTransition>
  );
}
