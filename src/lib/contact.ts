export const LAD_PHONE_DISPLAY = "722 291 3027";
export const LAD_PHONE_E164 = "+527222913027";
export const LAD_TEL_LINK = `tel:${LAD_PHONE_E164}`;

export function buildWhatsAppLink(message?: string) {
  const baseUrl = "https://wa.me/527222913027";
  if (!message) return baseUrl;
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export const LAD_WHATSAPP_LINK = buildWhatsAppLink(
  "Hola, necesito atención de LAD. ¿Me pueden ayudar?"
);

export const LAD_ADDRESS_DISPLAY =
  "Dr. Genaro Díaz Manon 129, La Trinidad, 52400 El Salitre, Méx.";
export const LAD_MAPS_LINK = "https://maps.app.goo.gl/3LitjXcwihswi6HQ9";
