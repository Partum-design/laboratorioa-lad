"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const videos = ["/vids/vid1.mp4", "/vids/vid2.mp4", "/vids/vid3.mp4", "/vids/vid4.mp4"];

export default function ConstruccionOverlay() {
  const [visible, setVisible] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).get("preview");
    const dismissed = sessionStorage.getItem("construccion-dismissed");
    if (!dismissed || preview === "1") setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    videoRefs.current.forEach((v) => {
      if (v) {
        v.muted = true;
        v.play().catch(() => {});
      }
    });
  }, [visible]);

  function handleEnter() {
    sessionStorage.setItem("construccion-dismissed", "1");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[200] flex flex-col overflow-hidden bg-lad-black"
        >
          {/* Mosaico de videos — todos reproduciendo a la vez */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            {videos.map((src, i) => (
              <video
                key={i}
                ref={(el) => { videoRefs.current[i] = el; }}
                src={src}
                muted
                loop
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
              />
            ))}
          </div>

          {/* Overlay oscuro sobre los videos */}
          <div className="absolute inset-0 bg-lad-black/65" />

          {/* Contenido centrado */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-8 px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src="/logo/logo-lad.png"
                alt="LAD Logo"
                width={200}
                height={200}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-lad-red" />
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-lad-red">Sitio en construccion</span>
                <div className="h-px w-12 bg-lad-red" />
              </div>
              <h1 className="font-display text-4xl font-black uppercase tracking-wider text-white md:text-6xl">
                Laboratorio<br />
                <span className="text-lad-red">de Apoyo y</span><br />
                Diagnostico
              </h1>
              <p className="mx-auto max-w-md text-base leading-relaxed text-gray-300">
                Pronto tendremos algo increible para ti. Estamos trabajando para brindarte la mejor experiencia.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              onClick={handleEnter}
              className="mt-4 border border-white/30 bg-white/10 px-10 py-3 text-xs font-bold uppercase tracking-[0.3em] text-white backdrop-blur-sm transition hover:bg-lad-red hover:border-lad-red"
            >
              Entrar al sitio
            </motion.button>
          </div>

          {/* Firma Partum Design */}
          <div className="relative z-10 py-4 text-center">
            <p className="text-[10px] font-light uppercase tracking-[0.4em] text-white/30">
              Partum Design · Desarrollo en proceso
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
