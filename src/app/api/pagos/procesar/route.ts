import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

import { getMercadoPagoConfig } from "@/lib/mercadopago/config";
import { consumirIntento, identificarCliente } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CuerpoPago {
  token?: unknown;
  issuer_id?: unknown;
  payment_method_id?: unknown;
  transaction_amount?: unknown;
  installments?: unknown;
  payer?: { email?: unknown; identification?: { type?: unknown; number?: unknown } };
  descripcion?: unknown;
  folio?: unknown;
}

function responder(cuerpo: Record<string, unknown>, estado: number) {
  return NextResponse.json(cuerpo, { status: estado, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const config = getMercadoPagoConfig();
  if (!config) {
    return responder(
      {
        ok: false,
        codigo: "no_configurado",
        mensaje: "El pago en línea no está disponible por el momento. Escríbenos y te ayudamos a pagar tu estudio.",
      },
      503,
    );
  }

  const limite = consumirIntento("pagos", identificarCliente(request.headers), 8);
  if (!limite.permitido) {
    return responder(
      { ok: false, codigo: "limite_excedido", mensaje: `Demasiados intentos. Espera ${limite.esperaSegundos} segundos.` },
      429,
    );
  }

  let cuerpo: CuerpoPago;
  try {
    cuerpo = (await request.json()) as CuerpoPago;
  } catch {
    return responder({ ok: false, codigo: "solicitud_invalida", mensaje: "No pudimos leer los datos del pago." }, 400);
  }

  const token = typeof cuerpo.token === "string" ? cuerpo.token : "";
  const paymentMethodId = typeof cuerpo.payment_method_id === "string" ? cuerpo.payment_method_id : "";
  const transactionAmount = Number(cuerpo.transaction_amount);
  const installments = Number(cuerpo.installments) || 1;
  const email = typeof cuerpo.payer?.email === "string" ? cuerpo.payer.email : "";
  const idType = typeof cuerpo.payer?.identification?.type === "string" ? cuerpo.payer.identification.type : undefined;
  const idNumber = typeof cuerpo.payer?.identification?.number === "string" ? cuerpo.payer.identification.number : undefined;
  const descripcion = typeof cuerpo.descripcion === "string" && cuerpo.descripcion.trim() ? cuerpo.descripcion.trim().slice(0, 200) : "Pago de estudios LAD";
  const folio = typeof cuerpo.folio === "string" ? cuerpo.folio.trim().slice(0, 80) : undefined;

  if (!token || !paymentMethodId || !email || !Number.isFinite(transactionAmount) || transactionAmount <= 0) {
    return responder({ ok: false, codigo: "solicitud_invalida", mensaje: "Faltan datos para procesar el pago." }, 400);
  }

  const client = new MercadoPagoConfig({ accessToken: config.accessToken });
  const paymentClient = new Payment(client);

  try {
    const resultado = await paymentClient.create({
      body: {
        transaction_amount: transactionAmount,
        token,
        description: descripcion,
        installments,
        payment_method_id: paymentMethodId,
        issuer_id: cuerpo.issuer_id !== undefined ? Number(cuerpo.issuer_id) : undefined,
        binary_mode: true,
        statement_descriptor: "LAD LABORATORIO",
        external_reference: folio,
        payer: {
          email,
          identification: idType && idNumber ? { type: idType, number: idNumber } : undefined,
        },
      },
      requestOptions: { idempotencyKey: randomUUID() },
    });

    const estado = resultado.status;

    if (estado === "approved") {
      return responder(
        {
          ok: true,
          estado: "aprobado",
          mensaje: "Tu pago se realizó con éxito. Guarda tu número de operación como comprobante.",
          idOperacion: resultado.id,
        },
        200,
      );
    }

    if (estado === "in_process" || estado === "pending") {
      return responder(
        {
          ok: true,
          estado: "en_proceso",
          mensaje: "Tu pago está en revisión. Te avisaremos en cuanto se confirme.",
          idOperacion: resultado.id,
        },
        200,
      );
    }

    return responder(
      {
        ok: false,
        codigo: "rechazado",
        mensaje: resultado.status_detail === "cc_rejected_insufficient_amount"
          ? "El banco rechazó el pago por fondos insuficientes."
          : "El banco rechazó el pago. Verifica los datos de tu tarjeta o intenta con otra.",
      },
      200,
    );
  } catch (error) {
    console.error("[mercadopago] Error procesando el pago:", error);
    return responder(
      { ok: false, codigo: "servicio_no_disponible", mensaje: "No pudimos conectar con el sistema de pagos. Inténtalo de nuevo en unos minutos." },
      502,
    );
  }
}

export function GET() {
  return NextResponse.json(
    { ok: false, mensaje: "Usa POST para procesar un pago." },
    { status: 405, headers: { Allow: "POST", "Cache-Control": "no-store" } },
  );
}
