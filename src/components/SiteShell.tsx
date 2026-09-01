"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import ChatbotWidget from "./ChatbotWidget";
import FloatingButtons from "./FloatingButtons";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import PayOnlineBanner from "./PayOnlineBanner";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    let attempts = 0;
    let frame: number;
    const scrollToHash = () => {
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts < 30) {
        attempts += 1;
        frame = requestAnimationFrame(scrollToHash);
      }
    };
    scrollToHash();
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <>
      <LoadingScreen />
      <FloatingButtons />
      <ChatbotWidget />
      <PayOnlineBanner />
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
