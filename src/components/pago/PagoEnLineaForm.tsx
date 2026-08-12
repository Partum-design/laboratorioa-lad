"use client";

import { CardPayment, initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { IconChip } from "@/components/IconBadge";
import { IconCheckCircle, IconCreditCard, IconShieldCheck, IconWhatsApp } from "@/components/LadIcons";
import { ICON_COLORS } from "@/lib/icon-palette";
import { buildWhatsAppLink } from "@/lib/contact";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;

function limpiarMonto(valor: string): string {
  return valor.replace(/[^0-9.]/g, "");
}

type Resultado = { estado: "aprobado" | "en_proceso" | "rechazado"; mensaje: string; idOperacion?: string | number };

export default function PagoEnLineaForm() {
  const searchParams = useSearchParams();

  const [descripcion, setDescripcion] = useState(searchParams.get("estudio") ?? "");
  const [monto, setMonto] = useState(limpiarMonto(searchParams.get("precio") ?? ""));
  const [folio, setFolio] = useState(searchParams.get("folio") ?? "");
  const [confirmado, setConfirmado] = useState(false);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (PUBLIC_KEY) initMercadoPago(PUBLIC_KEY, { locale: "es-MX" });
  }, []);

  const montoNumerico = useMemo(() => Number(monto), [monto]);
  const montoValido = Number.isFinite(montoNumerico) && montoNumerico > 0;

  if (!PUBLIC_KEY) {
    return (
      <div className="border-2 border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <IconChip color={ICON_COLORS.red} size="h-8 w-8"><IconCreditCard /></IconChip>
        <h3 className="mt-4 font-display text-lg font-bold text-lad-black">Estamos afinando el pago en línea</h3>
        <p className="mt-2 text-sm text-gray-500">
          En lo que activamos el cobro con tarjeta directo en el sitio, escríbenos por WhatsApp y te ayudamos a pagar tu
          estudio ahí mismo.
        </p>
        <a
          href={buildWhatsAppLink("Hola, quiero pagar en línea mi estudio. ¿Me pueden ayudar?")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-6 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a]"
        >
          <IconWhatsApp className="h-5 w-5" />
          Pagar por WhatsApp
        </a>
      </div>
    );
  }

  if (resultado) {
    const esExito = resultado.estado !== "rechazado";
    return (
      <div className={`border-2 p-6 text-center shadow-sm sm:p-8 ${esExito ? "border-green-200 bg-green-50" : "border-lad-red/30 bg-red-50"}`}>
        <IconChip color={esExito ? "#16a34a" : ICON_COLORS.red} size="h-9 w-9">
          <IconCheckCircle />
        </IconChip>
        <h3 className="mt-4 font-display text-lg font-bold text-lad-black">
          {resultado.estado === "aprobado" && "Pago aprobado"}
          {resultado.estado === "en_proceso" && "Pago en revisión"}
          {resultado.estado === "rechazado" && "No pudimos procesar tu pago"}
        </h3>
        <p className="mt-2 text-sm text-gray-600">{resultado.mensaje}</p>
        {resultado.idOperacion && (
          <p className="mt-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Operación #{resultado.idOperacion}
          </p>
        )}
        {resultado.estado === "rechazado" && (
          <button type="button" onClick={() => setResultado(null)} className="btn-outline mt-6">
            Intentar de nuevo
          </button>
        )}
      </div>
    );
  }

  if (!confirmado) {
    return (
      <form
        onSubmit={(evento) => {
          evento.preventDefault();
          if (montoValido && descripcion.trim()) setConfirmado(true);
        }}
        className="border-2 border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gray-500">
              ¿Qué vas a pagar?
            </label>
            <input
              value={descripcion}
              onChange={(evento) => setDescripcion(evento.target.value)}
              placeholder="Ej. Biometría hemática completa"
              required
              className="w-full border-2 border-gray-200 bg-white px-4 py-3.5 text-lad-black outline-none transition focus:border-lad-red"
            />
          </div>
          <div>
            <label className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gray-500">
              Monto a pagar (MXN)
            </label>
            <input
              value={monto}
              onChange={(evento) => setMonto(limpiarMonto(evento.target.value))}
              placeholder="Ej. 440"
              inputMode="decimal"
              required
              className="w-full border-2 border-gray-200 bg-white px-4 py-3.5 font-mono text-lg text-lad-black outline-none transition focus:border-lad-red"
            />
          </div>
          <div>
            <label className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gray-500">
              Folio (opcional)
            </label>
            <input
              value={folio}
              onChange={(evento) => setFolio(evento.target.value)}
              placeholder="Si ya tienes uno"
              className="w-full border-2 border-gray-200 bg-white px-4 py-3.5 font-mono text-lad-black outline-none transition focus:border-lad-red"
            />
          </div>
        </div>
        <button type="submit" disabled={!montoValido || !descripcion.trim()} className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">
          Continuar al pago
        </button>
      </form>
    );
  }

  return (
    <div className="border-2 border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-col gap-3 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gray-400">Vas a pagar</p>
          <p className="mt-1 font-display text-lg font-bold text-lad-black">{descripcion}</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="font-display text-2xl font-black text-lad-red">${montoNumerico.toLocaleString("es-MX")}</p>
          <button type="button" onClick={() => setConfirmado(false)} className="text-xs font-bold uppercase tracking-wider text-gray-400 underline hover:text-lad-red">
            Editar
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 text-xs text-gray-400">
        <IconChip color={ICON_COLORS.sky} size="h-4 w-4"><IconShieldCheck /></IconChip>
        Tus datos bancarios se procesan directo con Mercado Pago; LAD nunca los almacena.
      </div>

      {error && <p className="mb-4 border-l-4 border-lad-red bg-red-50 px-4 py-3 text-sm text-lad-red">{error}</p>}

      <CardPayment
        initialization={{ amount: montoNumerico }}
        onSubmit={async (formData) => {
          setProcesando(true);
          setError(null);
          try {
            const respuesta = await fetch("/api/pagos/procesar", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...formData, descripcion, folio: folio || undefined }),
            });
            const datos = await respuesta.json();

            if (datos.ok) {
              setResultado({ estado: datos.estado, mensaje: datos.mensaje, idOperacion: datos.idOperacion });
            } else {
              setError(datos.mensaje ?? "No pudimos procesar tu pago. Inténtalo de nuevo.");
            }
          } catch {
            setError("No pudimos completar el pago. Revisa tu conexión e inténtalo de nuevo.");
          } finally {
            setProcesando(false);
          }
        }}
        onError={() => setError("Revisa los datos de tu tarjeta e inténtalo de nuevo.")}
      />
      {procesando && <p className="mt-3 text-center text-sm text-gray-500">Procesando tu pago…</p>}
    </div>
  );
}
