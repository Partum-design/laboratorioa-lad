import "./globals.css";
import SiteShell from "@/components/SiteShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LAD - Laboratorio de Apoyo y Diagnostico",
  description:
    "Laboratorio de Apoyo y Diagnostico. Precision que genera confianza, resultados que importan. ISO 9001:2015.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-lad-black">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
