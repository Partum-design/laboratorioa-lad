"use client";

import { IconCreditCard } from "@/components/LadIcons";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "lad-pay-online-banner-dismissed";

export default function PayOnlineBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(STORAGE_KEY) === "1";
    setIsDismissed(dismissed);
    const showTimer = setTimeout(() => setIsVisible(true), 2400);
    return () => clearTimeout(showTimer);
  }, []);

  const dismiss = () => {
    setIsDismissed(true);
    window.localStorage.setItem(STORAGE_KEY, "1");
  };

  const restore = () => {
    setIsDismissed(false);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[90] flex justify-center px-3 sm:px-6">
      <AnimatePresence mode="wait">
        {isDismissed ? (
          <motion.button
            key="tab"
            type="button"
            onClick={restore}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            aria-label="Mostrar aviso de pago en línea"
            className="pointer-events-auto flex items-center gap-2 rounded-full bg-lad-black px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-lg ring-1 ring-white/10 transition hover:bg-lad-red"
          >
            <IconCreditCard className="h-4 w-4" />
            Pagar en línea
          </motion.button>
        ) : (
          <motion.div
            key="banner"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex items-center gap-2 rounded-full border-l-4 border-lad-red bg-white py-2 pl-3 pr-2 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] ring-1 ring-black/5 sm:w-full sm:max-w-md sm:gap-4 sm:rounded-2xl sm:py-3 sm:pl-5 sm:pr-3"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lad-red/10 text-lad-red sm:h-9 sm:w-9">
              <IconCreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <p className="hidden min-w-0 flex-1 text-sm font-semibold leading-snug text-lad-black sm:block">
              ¿Quieres pagar en línea?
            </p>
            <Link
              href="/estudios"
              className="shrink-0 whitespace-nowrap rounded-full bg-lad-red px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-md shadow-lad-red/30 transition hover:bg-lad-red-dark sm:px-3.5 sm:py-2 sm:text-xs"
            >
              <span className="sm:hidden">Pagar en línea</span>
              <span className="hidden sm:inline">Pagar ahora</span>
            </Link>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Ocultar aviso de pago en línea"
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-base leading-none text-gray-400 transition hover:bg-black/5 hover:text-lad-black"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
