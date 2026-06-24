import "./globals.css";
import SiteShell from "@/components/SiteShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LAD - Laboratorio de Apoyo y Diagnóstico",
  description:
    "Laboratorio de Apoyo y Diagnóstico. Precisión que genera confianza, resultados que importan. ISO 9001:2015.",
  icons: {
    icon: "/logo/logo-lad.png",
    apple: "/logo/logo-lad.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-lad-black">
        <div id="construccion-flash-block" style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#0a0a0a" }} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
