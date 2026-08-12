import "server-only";

// Configuración de Mercado Pago. El Access Token sólo se lee en el servidor:
// nunca debe viajar al navegador. La Public Key sí es pública (por eso lleva
// el prefijo NEXT_PUBLIC_) y es la que usa el Brick de tarjeta en el cliente.
export interface MercadoPagoServerConfig {
  accessToken: string;
}

export function getMercadoPagoConfig(): MercadoPagoServerConfig | null {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN?.trim();
  if (!accessToken) return null;
  return { accessToken };
}

export function getMercadoPagoPublicKey(): string | null {
  const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY?.trim();
  return publicKey || null;
}
