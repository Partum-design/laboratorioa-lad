export interface EdenPortal {
  slug: string;
  suffix: string;
  titulo: string;
  resumen: string;
  detalle: string;
  href: string;
}

// Accesos directos al ecosistema Eden (evacenter.com). Cada liga abre el login
// nativo de esa plataforma; LAD no gestiona usuarios ni contraseñas aquí.
export const edenPortals: EdenPortal[] = [
  {
    slug: "pacs",
    suffix: "pacs",
    titulo: "eden pacs",
    resumen: "Diagnóstico y análisis",
    detalle: "Consulta y análisis de estudios de imagen (PACS) para el personal médico y técnico.",
    href: "https://pacs.evacenter.com/?tab=studyList",
  },
  {
    slug: "management",
    suffix: "management",
    titulo: "eden management",
    resumen: "Operación y gestión de la organización",
    detalle: "Gestión operativa del laboratorio: órdenes, estudios y procesos internos del día a día.",
    href: "https://apps.evacenter.com/management/home/study-list",
  },
  {
    slug: "intelligence",
    suffix: "intelligence",
    titulo: "eden intelligence",
    resumen: "Transparencia y trazabilidad",
    detalle: "Indicadores, reportes y trazabilidad de la operación para dar seguimiento a los procesos.",
    href: "https://apps.evacenter.com/intelligence",
  },
  {
    slug: "admin",
    suffix: "admin",
    titulo: "eden admin",
    resumen: "Administración de usuarios",
    detalle: "Administración de usuarios, roles y accesos del personal dentro del ecosistema eden.",
    href: "https://pacs.evacenter.com/admin/",
  },
];
