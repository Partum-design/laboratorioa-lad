export const LAD_PHONE_DISPLAY = "722 291 3027";
export const LAD_PHONE_E164 = "+527222913027";
export const LAD_TEL_LINK = `tel:${LAD_PHONE_E164}`;

export function buildWhatsAppLink(message?: string) {
  const baseUrl = "https://wa.me/527222913027";
  if (!message) return baseUrl;
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export const LAD_WHATSAPP_MESSAGE = "Hola, necesito atención de LAD. ¿Me pueden ayudar?";

export const LAD_WHATSAPP_LINK = buildWhatsAppLink(LAD_WHATSAPP_MESSAGE);

export const LAD_ADDRESS_DISPLAY =
  "Calle Genaro Díaz Mañón No. 129, Colonia La Trinidad, C.P. 52436, Metepec, Méx.";
export const LAD_MAPS_LINK = "https://maps.app.goo.gl/3LitjXcwihswi6HQ9";

export interface LadSucursal {
  slug: string;
  nombre: string;
  direccion: string;
  horario: string[];
  telefonoDisplay: string;
  telefonoTelLink: string;
}

export const LAD_SUCURSALES: LadSucursal[] = [
  {
    slug: "metepec",
    nombre: "LAD Metepec (La Trinidad)",
    direccion: LAD_ADDRESS_DISPLAY,
    horario: [
      "Lun a vie: 7:00 am a 8:00 pm",
      "Sáb: 7:00 am a 5:00 pm",
      "Dom: 7:00 am a 4:00 pm",
    ],
    telefonoDisplay: LAD_PHONE_DISPLAY,
    telefonoTelLink: LAD_TEL_LINK,
  },
  {
    slug: "chalma",
    nombre: "LAD Chalma (Toma de muestras)",
    direccion: "Calle Miguel Hidalgo #657, Chalma, Estado de México.",
    horario: ["Lun a vie: 7:00 am a 3:00 pm"],
    telefonoDisplay: "714 191 02 77",
    telefonoTelLink: "tel:+527141910277",
  },
  {
    slug: "malinalco",
    nombre: "LAD Malinalco (Toma de muestras)",
    direccion: "Calle Hidalgo #201, Barrio San Juan, Malinalco, Estado de México.",
    horario: ["Lun a sáb: 8:00 am a 3:00 pm"],
    telefonoDisplay: "714 147 19 14",
    telefonoTelLink: "tel:+527141471914",
  },
];
