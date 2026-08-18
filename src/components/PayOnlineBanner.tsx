"use client";

import { IconCreditCard, IconTag } from "@/components/LadIcons";
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
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[90] flex justify-center px-24">
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
            className="pointer-events-auto relative flex w-full max-w-sm flex-col gap-2.5 overflow-hidden rounded-2xl border border-lad-red/10 bg-gradient-to-br from-white to-red-50/60 p-3.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.45)] ring-1 ring-black/5 sm:max-w-xl sm:flex-row sm:items-center sm:gap-4 sm:p-4"
          >
            <span className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-lad-red/10 blur-2xl" aria-hidden="true" />

            <div className="relative flex items-start gap-3 sm:flex-1 sm:items-center">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lad-red/10 text-lad-red">
                <IconCreditCard className="h-5 w-5" />
              </span>
              <p className="min-w-0 flex-1 text-[13px] font-bold leading-snug text-lad-black sm:text-sm">
                Paga en línea y obtén{" "}
                <span className="text-lad-red">
                  <IconTag className="mb-0.5 mr-1 inline-block h-3.5 w-3.5 align-middle" />
                  beneficios y descuentos exclusivos
                </span>
              </p>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Ocultar aviso de pago en línea"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-base leading-none text-gray-400 transition hover:bg-black/5 hover:text-lad-black sm:hidden"
              >
                ×
              </button>
            </div>

            <div className="relative flex items-center gap-2 sm:shrink-0">
              <Link
                href="/estudios"
                className="flex-1 whitespace-nowrap rounded-full bg-lad-red px-4 py-2 text-center text-[11px] font-bold uppercase tracking-wide text-white shadow-md shadow-lad-red/30 transition hover:bg-lad-red-dark sm:flex-none sm:px-4 sm:text-xs"
              >
                Pagar ahora
              </Link>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Ocultar aviso de pago en línea"
                className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-full text-base leading-none text-gray-400 transition hover:bg-black/5 hover:text-lad-black sm:flex"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
