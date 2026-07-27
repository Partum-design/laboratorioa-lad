import type {
  DocumentoDisponible,
  EdenOrder,
  EstudioPublico,
  EtapaEstudio,
} from "@/lib/eden/types";

// ---------------------------------------------------------------------------
// Estatus
// ---------------------------------------------------------------------------

// Eden maneja dos catálogos: el estatus de la orden y, cuando la orden ya está
// COMPLETED, el estatus del estudio dentro del PACS.
const ESTATUS_ORDEN: Record<string, { etapa: EtapaEstudio; texto: string; detalle: string }> = {
  NEW: {
    etapa: "registrado",
    texto: "Orden registrada",
    detalle: "Tu estudio ya está dado de alta. Acude a tu cita en la sucursal indicada.",
  },
  PATIENT_ARRIVED: {
    etapa: "registrado",
    texto: "Paciente registrado en sucursal",
    detalle: "Ya registramos tu llegada. En breve pasarás a la sala de estudio.",
  },
  IN_PROCESS: {
    etapa: "en_proceso",
    texto: "Estudio en proceso",
    detalle: "Estamos realizando tu estudio en este momento.",
  },
  "IN PROCESS": {
    etapa: "en_proceso",
    texto: "Estudio en proceso",
    detalle: "Estamos realizando tu estudio en este momento.",
  },
  COMPLETED: {
    etapa: "interpretacion",
    texto: "Estudio realizado",
    detalle: "Terminamos la toma de imágenes. Falta la interpretación del médico radiólogo.",
  },
  CANCELLED: {
    etapa: "cancelado",
    texto: "Orden cancelada",
    detalle: "Esta orden fue cancelada. Comunícate con nosotros si crees que se trata de un error.",
  },
};

const ESTATUS_ESTUDIO: Record<string, { etapa: EtapaEstudio; texto: string; detalle: string }> = {
  IMAGES_SENT: {
    etapa: "interpretacion",
    texto: "Imágenes recibidas",
    detalle: "Las imágenes ya están en el sistema y pasan a interpretación médica.",
  },
  READING_PENDING: {
    etapa: "interpretacion",
    texto: "Pendiente de interpretación",
    detalle: "Tu estudio está en la fila del médico radiólogo.",
  },
  READING: {
    etapa: "interpretacion",
    texto: "En interpretación",
    detalle: "El médico radiólogo está analizando tu estudio.",
  },
  REVIEW_PENDING: {
    etapa: "interpretacion",
    texto: "En revisión",
    detalle: "El reporte está en revisión antes de ser firmado.",
  },
  IN_ADDENDUM: {
    etapa: "interpretacion",
    texto: "En adenda",
    detalle: "Se está agregando información complementaria a tu reporte.",
  },
  SIGNED: {
    etapa: "listo",
    texto: "Resultados firmados",
    detalle: "Tu reporte está firmado por el médico radiólogo y listo para descargar.",
  },
  ADDENDUM_SIGNED: {
    etapa: "listo",
    texto: "Resultados firmados con adenda",
    detalle: "Tu reporte está firmado e incluye información complementaria.",
  },
  DELIVERED: {
    etapa: "listo",
    texto: "Resultados entregados",
    detalle: "Tus resultados están disponibles para consulta y descarga.",
  },
};

function normalizar(valor: string | null | undefined): string {
  return (valor ?? "").trim().toUpperCase().replace(/\s+/g, "_");
}

function resolverEstatus(orden: EdenOrder) {
  const estatusOrden = normalizar(orden.status);
  const estatusEstudio = normalizar(orden.pacs_study?.status);

  if (estatusOrden === "CANCELLED") return ESTATUS_ORDEN.CANCELLED;

  // El estatus del PACS es más específico y sólo aplica cuando ya hay estudio.
  const desdeEstudio = ESTATUS_ESTUDIO[estatusEstudio];
  if (desdeEstudio) return desdeEstudio;

  return (
    ESTATUS_ORDEN[estatusOrden] ?? {
      etapa: "registrado" as EtapaEstudio,
      texto: "Orden registrada",
      detalle: "Tu estudio está dado de alta en nuestro sistema.",
    }
  );
}

// ---------------------------------------------------------------------------
// Datos personales
// ---------------------------------------------------------------------------

/**
 * Muestra el nombre de pila completo y sólo la inicial de cada apellido.
 * Así el paciente confirma que el folio es suyo sin que un tercero que teclee
 * folios al azar obtenga el nombre completo.
 */
export function enmascararNombre(nombre: string | null | undefined): string | null {
  const limpio = (nombre ?? "").trim().replace(/\s+/g, " ");
  if (!limpio) return null;

  const partes = limpio.split(" ");
  if (partes.length === 1) return partes[0];

  // En los registros de Eden el orden suele ser APELLIDOS NOMBRE(S); mostramos
  // completo el último token y abreviamos el resto.
  return partes
    .map((parte, indice) => (indice === partes.length - 1 ? parte : `${parte.charAt(0)}.`))
    .join(" ");
}

function calcularEdad(fechaNacimiento: string | null | undefined): number | null {
  if (!fechaNacimiento) return null;
  const nacimiento = new Date(fechaNacimiento);
  if (Number.isNaN(nacimiento.getTime())) return null;

  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) edad -= 1;

  return edad >= 0 && edad < 130 ? edad : null;
}

/** Compara la fecha de nacimiento capturada contra la registrada en Eden. */
export function coincideFechaNacimiento(orden: EdenOrder, capturada: string): boolean {
  const registrada = (orden.patient?.birth_date ?? "").slice(0, 10);
  return Boolean(registrada) && registrada === capturada.slice(0, 10);
}

// ---------------------------------------------------------------------------
// Documentos
// ---------------------------------------------------------------------------

/** URL del PDF de resultados, con respaldo en los archivos firmados del PACS. */
export function urlReporte(orden: EdenOrder): string | null {
  if (orden.report_pdf_url) return orden.report_pdf_url;
  if (orden.report_pdf_letterhead_url) return orden.report_pdf_letterhead_url;

  const firmado = (orden.pacs_study?.study_pdf_files ?? []).find(
    (archivo) => archivo?.file_url && normalizar(archivo.status) === "COMPLETED",
  );
  return firmado?.file_url ?? null;
}

/** URL del PDF de la orden de estudio (la indicación, no los resultados). */
export function urlOrden(orden: EdenOrder): string | null {
  return orden.pdf_url ?? orden.pdf_letterhead_url ?? null;
}

function listarDocumentos(orden: EdenOrder): DocumentoDisponible[] {
  const documentos: DocumentoDisponible[] = [];

  if (urlReporte(orden)) {
    documentos.push({
      tipo: "reporte",
      etiqueta: "Reporte de resultados",
      descripcion: "Interpretación firmada por el médico radiólogo, en PDF.",
    });
  }

  if (urlOrden(orden)) {
    documentos.push({
      tipo: "orden",
      etiqueta: "Orden de estudio",
      descripcion: "Documento de la orden con los datos de tu solicitud.",
    });
  }

  return documentos;
}

// ---------------------------------------------------------------------------
// Mapeo público
// ---------------------------------------------------------------------------

function texto(valor: string | null | undefined): string | null {
  const limpio = (valor ?? "").trim();
  return limpio ? limpio : null;
}

/**
 * Convierte la orden de Eden en el objeto que sí puede viajar al navegador.
 * Todo lo que no está aquí (identificadores internos, correo, teléfono, UUIDs)
 * se queda en el servidor.
 */
export function presentarEstudio(orden: EdenOrder, visorFirmado: string | null): EstudioPublico {
  const estatus = resolverEstatus(orden);
  const medico = orden.referring_practitioner;

  return {
    folio: texto(orden.folio) ?? "",
    etapa: estatus.etapa,
    estatusTexto: estatus.texto,
    estatusDetalle: estatus.detalle,
    resultadosListos: estatus.etapa === "listo" && Boolean(urlReporte(orden)),
    paciente: {
      nombreEnmascarado: enmascararNombre(orden.patient?.full_name),
      edad: calcularEdad(orden.patient?.birth_date),
    },
    estudio: {
      nombre: texto(orden.management_study?.name),
      modalidad: texto(orden.modality?.identifier ?? orden.management_study?.modality?.identifier),
      descripcion: texto(orden.description),
      codigo: texto(orden.management_study?.code?.code),
    },
    sucursal: texto(orden.facility?.name),
    medicoTratante: texto(medico?.full_name ?? [medico?.name, medico?.first_surname, medico?.last_surname].filter(Boolean).join(" ")),
    fechaRegistro: texto(orden.created_at),
    fechaEstudio: texto(orden.pacs_study?.dicom_date_time),
    fechaCita: texto(orden.appointment?.start_date),
    documentos: listarDocumentos(orden),
    visorUrl: texto(orden.public_study_viewer_link) ?? visorFirmado,
  };
}
