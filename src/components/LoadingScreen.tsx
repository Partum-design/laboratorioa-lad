"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const DURATION_MS = 2200;
const SESSION_KEY = "lad:loaded";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
    document.getElementById("construccion-flash-block")?.remove();

    if (sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false);
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION_MS, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          sessionStorage.setItem(SESSION_KEY, "1");
          setVisible(false);
        }, 350);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const pct = Math.round(progress * 100);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#080808" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Scan line */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #E30613 40%, #ff2233 50%, #E30613 60%, transparent 100%)",
              opacity: 0.5,
            }}
            initial={{ top: "-1%" }}
            animate={{ top: "101%" }}
            transition={{ duration: 1.8, ease: "linear", repeat: Infinity, repeatDelay: 0.4 }}
          />

          {/* Ambient red glow */}
          <motion.div
            className="pointer-events-none absolute rounded-full"
            style={{
              width: 500,
              height: 500,
              background: "radial-gradient(circle, rgba(227,6,19,0.12) 0%, transparent 68%)",
            }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.1, ease: "easeOut" }}
          />

          {/* Outer rotating ring */}
          <motion.div
            className="pointer-events-none absolute"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.svg
              width="300"
              height="300"
              viewBox="0 0 300 300"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <circle
                cx="150"
                cy="150"
                r="138"
                fill="none"
                stroke="rgba(227,6,19,0.18)"
                strokeWidth="1"
                strokeDasharray="6 18"
                strokeLinecap="round"
              />
            </motion.svg>
          </motion.div>

          {/* Inner counter-rotating ring */}
          <motion.div
            className="pointer-events-none absolute"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.svg
              width="220"
              height="220"
              viewBox="0 0 220 220"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <circle
                cx="110"
                cy="110"
                r="100"
                fill="none"
                stroke="rgba(227,6,19,0.30)"
                strokeWidth="1.5"
                strokeDasharray="2.5 20"
                strokeLinecap="round"
              />
            </motion.svg>
          </motion.div>

          {/* Pulsing ring */}
          <motion.div
            className="pointer-events-none absolute rounded-full border border-lad-red/20"
            style={{ width: 170, height: 170 }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Logo */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/logo/logo-lad.png"
              alt="LAD"
              width={130}
              height={130}
              className="object-contain"
              style={{ filter: "drop-shadow(0 0 28px rgba(227,6,19,0.45))" }}
              priority
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="relative z-10 mt-7 font-display text-[9px] font-bold uppercase tracking-[0.55em] text-white/35"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
          >
            Laboratorio de Apoyo y Diagnóstico
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-14 left-1/2 -translate-x-1/2"
            style={{ width: 180 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div
              className="relative h-px w-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="absolute inset-y-0 left-0 transition-none"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #B3000E, #E30613, #ff2233)",
                }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <motion.span
                className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/20"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                Cargando
              </motion.span>
              <span className="text-[8px] font-bold tabular-nums text-lad-red/60">
                {pct}%
              </span>
            </div>
          </motion.div>

          {/* Corner brackets */}
          <CornerBracket position="top-left" delay={0.8} />
          <CornerBracket position="top-right" delay={0.9} />
          <CornerBracket position="bottom-left" delay={1.0} />
          <CornerBracket position="bottom-right" delay={1.1} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CornerBracket({
  position,
  delay,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  delay: number;
}) {
  const isTop = position.startsWith("top");
  const isLeft = position.endsWith("left");

  const initial = {
    opacity: 0,
    x: isLeft ? -8 : 8,
    y: isTop ? -8 : 8,
  };

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        top: isTop ? 28 : "auto",
        bottom: isTop ? "auto" : 28,
        left: isLeft ? 28 : "auto",
        right: isLeft ? "auto" : 28,
      }}
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        style={{
          transform: `rotate(${isTop && isLeft ? 0 : isTop && !isLeft ? 90 : !isTop && isLeft ? 270 : 180}deg)`,
        }}
      >
        <path d="M0 16 L0 0 L16 0" stroke="rgba(227,6,19,0.45)" strokeWidth="1.5" />
      </svg>
    </motion.div>
  );
}
