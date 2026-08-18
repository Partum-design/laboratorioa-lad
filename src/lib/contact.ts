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
  "Dr. Genaro Díaz Manon 129, La Trinidad, 52400 El Salitre, Estado de México.";
export const LAD_MAPS_LINK = "https://maps.app.goo.gl/QwrJPLhwEguEfzeY8";

export const LAD_METEPEC_ADDRESS =
  "Calle Benito Juárez García No. 514 Norte, Colonia San Mateo, C.P. 52140, Metepec, Estado de México.";
export const LAD_METEPEC_MAPS_LINK = "https://maps.app.goo.gl/tpyLhPCzGz4DtDtD6?g_st=iw";

export const LAD_TENANCINGO_CENTRO_ADDRESS =
  "Av. Morelos No. 301-A, Colonia Centro, C.P. 52400, Tenancingo, Estado de México.";
export const LAD_TENANCINGO_CENTRO_MAPS_LINK = `https://www.google.com/maps?q=${encodeURIComponent(LAD_TENANCINGO_CENTRO_ADDRESS)}`;

export interface LadSucursal {
  slug: string;
  nombre: string;
  direccion: string;
  horario: string[];
  telefonoDisplay?: string;
  telefonoTelLink?: string;
  mapsLink?: string;
  esMatriz?: boolean;
}

export const LAD_SUCURSALES: LadSucursal[] = [
  {
    slug: "matriz",
    nombre: "LAD El Salitre (Matriz)",
    direccion: LAD_ADDRESS_DISPLAY,
    horario: [
      "Lun a vie: 7:00 am a 8:00 pm",
      "Sáb: 7:30 am a 8:00 pm",
      "Dom: 7:30 am a 4:00 pm",
    ],
    telefonoDisplay: LAD_PHONE_DISPLAY,
    telefonoTelLink: LAD_TEL_LINK,
    mapsLink: LAD_MAPS_LINK,
    esMatriz: true,
  },
  {
    slug: "tenancingo-centro",
    nombre: "LAD Tenancingo — Centro Médico Av. Morelos",
    direccion: LAD_TENANCINGO_CENTRO_ADDRESS,
    horario: [
      "Lun a vie: 7:00 am a 8:00 pm",
      "Sáb: 7:00 am a 5:00 pm",
      "Dom: 7:00 am a 4:00 pm",
    ],
    mapsLink: LAD_TENANCINGO_CENTRO_MAPS_LINK,
  },
  {
    slug: "metepec",
    nombre: "LAD Metepec",
    direccion:
      "Calle Benito Juárez García No. 514 Norte, Colonia San Mateo, C.P. 52140, Metepec, Estado de México (Entre Mariano Matamoros y Josefa Ortiz de Domínguez).",
    horario: [
      "Lun a vie: 7:00 am a 8:00 pm",
      "Sáb: 7:00 am a 5:00 pm",
      "Dom: 7:00 am a 4:00 pm",
    ],
    telefonoDisplay: LAD_PHONE_DISPLAY,
    telefonoTelLink: LAD_TEL_LINK,
    mapsLink: LAD_METEPEC_MAPS_LINK,
  },
  {
    slug: "chalma",
    nombre: "LAD Chalma (Toma de muestras)",
    direccion: "Calle Miguel Hidalgo #657, Chalma, Estado de México.",
    horario: ["Lun a vie: 7:00 am a 3:00 pm"],
    telefonoDisplay: "714 191 02 77",
    telefonoTelLink: "tel:+527141910277",
    mapsLink: `https://www.google.com/maps?q=${encodeURIComponent("Calle Miguel Hidalgo #657, Chalma, Estado de México.")}`,
  },
  {
    slug: "malinalco",
    nombre: "LAD Malinalco (Toma de muestras)",
    direccion: "Calle Hidalgo #201, Barrio San Juan, Malinalco, Estado de México.",
    horario: ["Lun a sáb: 8:00 am a 3:00 pm"],
    telefonoDisplay: "714 147 19 14",
    telefonoTelLink: "tel:+527141471914",
    mapsLink: `https://www.google.com/maps?q=${encodeURIComponent("Calle Hidalgo #201, Barrio San Juan, Malinalco, Estado de México.")}`,
  },
];
