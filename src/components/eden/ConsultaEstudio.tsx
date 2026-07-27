"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";

import { IconChip } from "@/components/IconBadge";
import {
  IconCheckCircle,
  IconClock,
  IconEye,
  IconMapPin,
  IconResults,
  IconScan,
  IconSearch,
  IconShieldCheck,
} from "@/components/LadIcons";
import { ICON_COLORS } from "@/lib/icon-palette";
import { esFolioValido, normalizarFolio } from "@/lib/eden/folio";
import type { ConsultaRespuesta, EstudioPublico, EtapaEstudio } from "@/lib/eden/types";

const ETAPAS: { clave: EtapaEstudio; titulo: string }[] = [
  { clave: "registrado", titulo: "Registrado" },
  { clave: "en_proceso", titulo: "En proceso" },
  { clave: "interpretacion", titulo: "Interpretación" },
  { clave: "listo", titulo: "Resultados" },
];

function indiceEtapa(etapa: EtapaEstudio): number {
  return ETAPAS.findIndex((paso) => paso.clave === etapa);
}

function formatearFecha(valor: string | null, conHora = true): string | null {
  if (!valor) return null;
  const fecha = new Date(valor);
  if (Number.isNaN(fecha.getTime())) return null;

  return fecha.toLocaleString("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    ...(conHora ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}

// ---------------------------------------------------------------------------

function Linea({ etiqueta, valor }: { etiqueta: string; valor: string | null }) {
  if (!valor) return null;
  return (
    <div className="border-t border-gray-200 py-3 first:border-t-0 first:pt-0">
      <dt className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gray-400">{etiqueta}</dt>
      <dd className="mt-1 text-sm font-medium text-lad-black">{valor}</dd>
    </div>
  );
}

function Progreso({ etapa }: { etapa: EtapaEstudio }) {
  if (etapa === "cancelado") {
    return (
      <div className="border-l-4 border-gray-400 bg-gray-100 px-5 py-4 text-sm font-semibold text-gray-600">
        Esta orden fue cancelada.
      </div>
    );
  }

  const actual = indiceEtapa(etapa);

  return (
    <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {ETAPAS.map((paso, indice) => {
        const alcanzado = indice <= actual;
        const esActual = indice === actual;
        return (
          <li key={paso.clave} className="flex flex-col gap-2">
            <span
              className={`h-1 w-full transition-colors duration-500 ${alcanzado ? "bg-lad-red" : "bg-gray-200"}`}
              aria-hidden
            />
            <span
              className={`text-[0.65rem] font-bold uppercase tracking-[0.16em] ${
                esActual ? "text-lad-red" : alcanzado ? "text-lad-black" : "text-gray-400"
              }`}
            >
              {paso.titulo}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function Resultado({ estudio, fechaNacimiento }: { estudio: EstudioPublico; fechaNacimiento: string }) {
  const parametros = new URLSearchParams({ folio: estudio.folio });
  if (fechaNacimiento) parametros.set("fechaNacimiento", fechaNacimiento);

  const listo = estudio.etapa === "listo";
  const cancelado = estudio.etapa === "cancelado";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mt-10 border-2 border-gray-200 bg-white shadow-sm"
    >
      {/* Encabezado */}
      <header className="flex flex-col gap-4 border-b border-gray-200 bg-lad-black p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-lad-red">Folio {estudio.folio}</p>
          <h3 className="mt-2 font-display text-2xl font-black leading-tight sm:text-3xl">
            {estudio.estudio.nombre ?? "Estudio de imagen"}
          </h3>
          {estudio.paciente.nombreEnmascarado && (
            <p className="mt-2 text-sm text-gray-400">
              Paciente: <span className="font-semibold text-gray-200">{estudio.paciente.nombreEnmascarado}</span>
              {estudio.paciente.edad !== null && <span className="text-gray-500"> · {estudio.paciente.edad} años</span>}
            </p>
          )}
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-2 border px-4 py-2 text-xs font-bold uppercase tracking-wider ${
            cancelado
              ? "border-gray-500 text-gray-300"
              : listo
                ? "border-lad-red bg-lad-red text-white"
                : "border-white/30 text-white"
          }`}
        >
          <IconChip color="currentColor" size="h-4 w-4">
            {listo ? <IconCheckCircle /> : <IconClock />}
          </IconChip>
          {estudio.estatusTexto}
        </span>
      </header>

      <div className="space-y-8 p-6 sm:p-8">
        <div>
          <Progreso etapa={estudio.etapa} />
          <p className="mt-4 text-sm leading-relaxed text-gray-600">{estudio.estatusDetalle}</p>
        </div>

        <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
          <Linea etiqueta="Modalidad" valor={estudio.estudio.modalidad} />
          <Linea etiqueta="Clave del estudio" valor={estudio.estudio.codigo} />
          <Linea etiqueta="Indicación" valor={estudio.estudio.descripcion} />
          <Linea etiqueta="Sucursal" valor={estudio.sucursal} />
          <Linea etiqueta="Médico solicitante" valor={estudio.medicoTratante} />
          <Linea etiqueta="Fecha de registro" valor={formatearFecha(estudio.fechaRegistro)} />
          <Linea etiqueta="Fecha de la cita" valor={formatearFecha(estudio.fechaCita)} />
          <Linea etiqueta="Fecha del estudio" valor={formatearFecha(estudio.fechaEstudio)} />
        </dl>

        {/* Descargas y visor */}
        {(estudio.documentos.length > 0 || estudio.visorUrl) && (
          <div className="border-t border-gray-200 pt-6">
            <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gray-400">Disponible para ti</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {estudio.documentos.map((documento) => {
                const enlace = new URLSearchParams(parametros);
                enlace.set("tipo", documento.tipo);
                return (
                  <a
                    key={documento.tipo}
                    href={`/api/eden/documento?${enlace.toString()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={documento.tipo === "reporte" ? "btn-primary" : "btn-outline"}
                    title={documento.descripcion}
                  >
                    <IconChip color="currentColor" size="h-4 w-4"><IconResults /></IconChip>
                    {documento.etiqueta}
                  </a>
                );
              })}

              {estudio.visorUrl && (
                <a
                  href={estudio.visorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  title="Abre las imágenes de tu estudio en el visor de Eden"
                >
                  <IconChip color="currentColor" size="h-4 w-4"><IconScan /></IconChip>
                  Ver imágenes
                </a>
              )}
            </div>
          </div>
        )}

        {!listo && !cancelado && (
          <div className="flex items-start gap-3 border border-gray-200 bg-lad-gray-light p-4">
            <IconChip color={ICON_COLORS.red} size="h-5 w-5"><IconClock /></IconChip>
            <p className="text-sm text-gray-600">
              Tus resultados aparecerán aquí en cuanto el médico radiólogo firme el reporte. Puedes volver a consultar
              este folio las veces que necesites.
            </p>
          </div>
        )}
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------

interface ConsultaEstudioProps {
  requiereFechaNacimiento: boolean;
}

export default function ConsultaEstudio({ requiereFechaNacimiento }: ConsultaEstudioProps) {
  const idFolio = useId();
  const idFecha = useId();

  const [folio, setFolio] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [cargando, setCargando] = useState(false);
  const [estudio, setEstudio] = useState<EstudioPublico | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Se conserva la fecha con la que se validó, para firmar las descargas.
  const [fechaValidada, setFechaValidada] = useState("");

  async function consultar(evento: React.FormEvent) {
    evento.preventDefault();
    if (cargando) return;

    const folioLimpio = normalizarFolio(folio);
    if (!esFolioValido(folioLimpio)) {
      setEstudio(null);
      setError("Escribe el folio tal como aparece en tu comprobante (al menos 3 caracteres).");
      return;
    }

    setCargando(true);
    setError(null);
    setEstudio(null);

    try {
      const respuesta = await fetch("/api/eden/consulta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folio: folioLimpio, fechaNacimiento }),
      });
      const datos = (await respuesta.json()) as ConsultaRespuesta;

      if (datos.ok) {
        setEstudio(datos.estudio);
        setFechaValidada(fechaNacimiento);
      } else {
        setError(datos.mensaje);
      }
    } catch {
      setError("No pudimos completar la consulta. Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div>
      <form onSubmit={consultar} className="border-2 border-gray-200 bg-white p-6 shadow-sm sm:p-8" noValidate>
        <div className={`grid gap-5 ${requiereFechaNacimiento ? "sm:grid-cols-2" : ""}`}>
          <div className={requiereFechaNacimiento ? "" : "sm:max-w-xl"}>
            <label htmlFor={idFolio} className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gray-500">
              Folio o ID de tu estudio
            </label>
            <input
              id={idFolio}
              name="folio"
              value={folio}
              onChange={(evento) => setFolio(evento.target.value)}
              placeholder="Ej. LAD-16128"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={80}
              className="w-full border-2 border-gray-200 bg-white px-4 py-3.5 font-mono text-lg tracking-wide text-lad-black outline-none transition focus:border-lad-red"
            />
          </div>

          {requiereFechaNacimiento && (
            <div>
              <label htmlFor={idFecha} className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gray-500">
                Fecha de nacimiento del paciente
              </label>
              <input
                id={idFecha}
                name="fechaNacimiento"
                type="date"
                value={fechaNacimiento}
                onChange={(evento) => setFechaNacimiento(evento.target.value)}
                max={new Date().toISOString().slice(0, 10)}
                className="w-full border-2 border-gray-200 bg-white px-4 py-3.5 text-lg text-lad-black outline-none transition focus:border-lad-red"
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" disabled={cargando} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
            <IconChip color="#ffffff" size="h-4 w-4"><IconSearch /></IconChip>
            {cargando ? "Consultando…" : "Consultar estudio"}
          </button>
          <p className="flex items-center gap-2 text-xs text-gray-500">
            <IconChip color={ICON_COLORS.red} size="h-4 w-4"><IconShieldCheck /></IconChip>
            Consulta directa y cifrada al expediente de LAD.
          </p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              key={error}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="mt-5 border-l-4 border-lad-red bg-red-50 px-4 py-3 text-sm font-medium text-lad-black"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </form>

      <div aria-live="polite">
        {estudio && <Resultado key={estudio.folio} estudio={estudio} fechaNacimiento={fechaValidada} />}
      </div>

      {!estudio && !error && (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icono: <IconSearch />, titulo: "Escribe tu folio", texto: "Viene en tu comprobante o en el mensaje que te enviamos." },
            { icono: <IconEye />, titulo: "Revisa el avance", texto: "Verás en qué etapa va tu estudio, actualizado al momento." },
            { icono: <IconResults />, titulo: "Descarga tu reporte", texto: "Cuando el radiólogo firma, el PDF queda disponible aquí." },
          ].map((paso) => (
            <div key={paso.titulo} className="border border-gray-200 bg-white p-5">
              <IconChip color={ICON_COLORS.red} size="h-6 w-6">{paso.icono}</IconChip>
              <p className="mt-3 font-display text-sm font-bold uppercase tracking-wide text-lad-black">{paso.titulo}</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-500">{paso.texto}</p>
            </div>
          ))}
        </div>
      )}

      <p className="mt-8 flex items-start gap-2 text-xs leading-relaxed text-gray-500">
        <IconChip color={ICON_COLORS.red} size="h-4 w-4"><IconMapPin /></IconChip>
        ¿No encuentras tu folio o necesitas ayuda para interpretar tu reporte? Comunícate con nosotros: te atendemos en
        sucursal, por teléfono o por WhatsApp.
      </p>
    </div>
  );
}
