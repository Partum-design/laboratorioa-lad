"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import ConstruccionOverlay from "./ConstruccionOverlay";
import FloatingButtons from "./FloatingButtons";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <ConstruccionOverlay />
      <FloatingButtons />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <main key={pathname} className="min-h-screen">
          {children}
        </main>
      </AnimatePresence>
      <Footer />
    </>
  );
}
