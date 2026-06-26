"use client";

import { LAD_PHONE_DISPLAY, LAD_TEL_LINK, LAD_WHATSAPP_LINK } from "@/lib/contact";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const videos = [
  "/vids/inicio/hero1.mp4",
  "/vids/estudios/hero.mp4",
  "/vids/nosotros/resonancia.mp4",
  "/vids/contacto/hero.mp4",
];
const STORAGE_KEY = "lad:construction-preview";

// ── Partículas ──────────────────────────────────────────────────────────────
const COLORS = ["#E30613", "#ff2233", "#c0000f", "#ff4455", "#8b0000", "#ff6677"];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  color: string;
  alpha: number;
}

function useParticles(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Crear partículas
    const COUNT = 110;
    particles.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2.5 + 0.8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.6 + 0.2,
    }));

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const REPEL_RADIUS = 120;
    const REPEL_FORCE = 3.5;
    const FRICTION = 0.92;
    const CONNECT_DIST = 90;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pts = particles.current;

      // Líneas de conexión entre partículas cercanas
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(227,6,19,${0.18 * (1 - dist / CONNECT_DIST)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      // Actualizar y dibujar cada partícula
      for (const p of pts) {
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          p.vx += (dx / dist) * force * REPEL_FORCE * 0.08;
          p.vy += (dy / dist) * force * REPEL_FORCE * 0.08;
        }

        p.vx *= FRICTION;
        p.vy *= FRICTION;

        // Velocidad mínima para que no paren del todo
        if (Math.abs(p.vx) < 0.15) p.vx += (Math.random() - 0.5) * 0.1;
        if (Math.abs(p.vy) < 0.15) p.vy += (Math.random() - 0.5) * 0.1;

        p.x += p.vx;
        p.y += p.vy;

        // Rebote en bordes
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1; }

        // Glow effect
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        grd.addColorStop(0, `${p.color}${Math.round(p.alpha * 255).toString(16).padStart(2, "0")}`);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      raf.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [canvasRef]);
}

// ── Overlay de videos ────────────────────────────────────────────────────────
function VideoMosaic() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      videoRefs.current.forEach((v) => {
        if (!v) return;
        v.muted = true;
        v.volume = 0;
        v.play().catch(() => {});
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
      {videos.map((src, i) => (
        <video
          key={i}
          ref={(el) => { videoRefs.current[i] = el; }}
          src={src}
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onCanPlay={(e) => {
            const v = e.currentTarget;
            v.muted = true;
            v.volume = 0;
            v.play().catch(() => {});
          }}
          className="h-full w-full object-cover"
        />
      ))}
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────────────────────
export default function ConstruccionOverlay() {
  const [hidden, setHidden] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef);

  useEffect(() => {
    const el = document.getElementById("construccion-flash-block");
    if (el) el.remove();
  }, []);

  useEffect(() => {
    const unlockPreview = () => {
      window.localStorage.setItem(STORAGE_KEY, "true");
      setHidden(true);
    };

    if (window.localStorage.getItem(STORAGE_KEY) === "true") {
      setHidden(true);
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "l") {
        unlockPreview();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const unlockPreview = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setHidden(true);
  };

  return (
    <AnimatePresence>
      {!hidden && (
      <motion.div
        className="fixed inset-0 z-[200] flex flex-col overflow-hidden bg-lad-black"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        {/* Videos de fondo */}
        <VideoMosaic />

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-lad-black/75" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-lad-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-lad-black to-transparent" />

        {/* Canvas de partículas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-[1]" />

        {/* Contenido */}
        <div className="relative z-[2] flex flex-1 flex-col items-center justify-center gap-8 px-6 py-20 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
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

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="max-w-3xl space-y-6"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-lad-red" />
              <span className="text-xs font-bold uppercase tracking-[0.45em] text-lad-red">
                Sitio en construcción
              </span>
              <div className="h-px w-10 bg-lad-red" />
            </div>

            <h1 className="font-display text-4xl font-black uppercase leading-tight tracking-wider text-white md:text-6xl lg:text-7xl">
              Estamos afinando<br />
              <span className="text-lad-red">los últimos</span><br />
              detalles
            </h1>

            <p className="mx-auto max-w-2xl text-balance text-base leading-relaxed text-gray-200 md:text-lg">
              Si necesitas atención inmediata, llámanos o envíanos un WhatsApp al teléfono{" "}
              <span className="font-bold text-white">{LAD_PHONE_DISPLAY}</span>.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
              <a href={LAD_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary min-w-44">
                WhatsApp
              </a>
              <a href={LAD_TEL_LINK} className="btn-white min-w-44">
                Llamar ahora
              </a>
            </div>

            {/* Badge ISO */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <div className="h-px w-6 bg-lad-red" />
              <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-lad-red">
                ISO 9001:2015 Certificado
              </span>
              <div className="h-px w-6 bg-lad-red" />
            </div>
          </motion.div>
        </div>

        {/* Firma Partum Design */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="relative z-[2] py-5 text-center"
        >
          <a
            href="https://partumdesign.com.mx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-light uppercase tracking-[0.45em] text-white/30 transition hover:text-lad-red"
          >
            Partum Design · Desarrollo en proceso
          </a>
        </motion.div>
        <button
          type="button"
          aria-label="Ver sitio principal"
          onClick={unlockPreview}
          className="absolute bottom-3 left-3 z-[3] h-9 w-9 rounded-full border border-white/20 bg-white/10 text-[0px] opacity-0 outline-none transition hover:w-auto hover:px-3 hover:text-[10px] hover:font-bold hover:uppercase hover:tracking-[0.25em] hover:text-white hover:opacity-100 focus:w-auto focus:px-3 focus:text-[10px] focus:font-bold focus:uppercase focus:tracking-[0.25em] focus:text-white focus:opacity-100"
        >
          Ver sitio
        </button>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
