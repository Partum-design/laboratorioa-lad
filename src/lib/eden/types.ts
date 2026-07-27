// Tipos del API REST de Eden (middleware). Sólo modelamos los campos que
// consumimos; el API puede devolver más y eso no rompe nada.

export interface EdenEnvelope<T> {
  data: T | null;
  errors: { code?: string; message?: unknown } | null;
  success: boolean;
}

export interface EdenNamed {
  id?: string;
  name?: string | null;
}

export interface EdenModality {
  id?: string;
  identifier?: string | null;
}

export interface EdenStudyPdfFile {
  file_url?: string | null;
  status?: string | null;
  updated_at?: string | null;
}

export interface EdenPacsStudy {
  id?: string;
  dicom_date_time?: string | null;
  status?: string | null;
  study_pdf_files?: EdenStudyPdfFile[] | null;
}

export interface EdenManagementStudy {
  id?: string;
  name?: string | null;
  code?: { code?: string | null; name?: string | null } | null;
  modality?: EdenModality | null;
}

export interface EdenPatient {
  id?: string;
  full_name?: string | null;
  gender?: string | null;
  birth_date?: string | null;
  identifier?: string | null;
}

export interface EdenPractitioner {
  full_name?: string | null;
  name?: string | null;
  first_surname?: string | null;
  last_surname?: string | null;
}

export interface EdenAppointment {
  id?: string;
  start_date?: string | null;
  end_date?: string | null;
}

export interface EdenOrder {
  id?: string;
  folio?: string | null;
  priority?: string | null;
  description?: string | null;
  comments?: string | null;
  created_at?: string | null;
  status?: string | null;
  referring_practitioner?: EdenPractitioner | null;
  viewer_link?: string | null;
  pdf_url?: string | null;
  pdf_letterhead_url?: string | null;
  study_viewer_link?: string | null;
  public_study_viewer_link?: string | null;
  report_viewer_link?: string | null;
  report_pdf_url?: string | null;
  report_pdf_letterhead_url?: string | null;
  pacs_study?: EdenPacsStudy | null;
  management_study?: EdenManagementStudy | null;
  patient?: EdenPatient | null;
  modality?: EdenModality | null;
  facility?: EdenNamed | null;
  room?: EdenNamed | null;
  appointment?: EdenAppointment | null;
}

// ---------------------------------------------------------------------------
// Modelo público: lo único que sale hacia el navegador.
// ---------------------------------------------------------------------------

export type EtapaEstudio = "registrado" | "en_proceso" | "interpretacion" | "listo" | "cancelado";

export type DocumentoTipo = "reporte" | "orden";

export interface DocumentoDisponible {
  tipo: DocumentoTipo;
  etiqueta: string;
  descripcion: string;
}

export interface EstudioPublico {
  folio: string;
  etapa: EtapaEstudio;
  estatusTexto: string;
  estatusDetalle: string;
  resultadosListos: boolean;
  paciente: {
    /** Nombre parcialmente enmascarado: confirma identidad sin exponer el dato completo. */
    nombreEnmascarado: string | null;
    edad: number | null;
  };
  estudio: {
    nombre: string | null;
    modalidad: string | null;
    descripcion: string | null;
    codigo: string | null;
  };
  sucursal: string | null;
  medicoTratante: string | null;
  fechaRegistro: string | null;
  fechaEstudio: string | null;
  fechaCita: string | null;
  documentos: DocumentoDisponible[];
  /** URL pública firmada del visor DICOM, si Eden la expone. */
  visorUrl: string | null;
}

export interface ConsultaExitosa {
  ok: true;
  estudio: EstudioPublico;
}

export type ConsultaErrorCodigo =
  | "folio_invalido"
  | "no_encontrado"
  | "verificacion_fallida"
  | "limite_excedido"
  | "no_configurado"
  | "servicio_no_disponible";

export interface ConsultaFallida {
  ok: false;
  codigo: ConsultaErrorCodigo;
  mensaje: string;
}

export type ConsultaRespuesta = ConsultaExitosa | ConsultaFallida;
