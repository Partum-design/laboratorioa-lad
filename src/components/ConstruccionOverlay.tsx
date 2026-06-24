"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const videos = ["/vids/vid1.mp4", "/vids/vid2.mp4", "/vids/vid3.mp4", "/vids/vid4.mp4"];

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef);

  useEffect(() => {
    const el = document.getElementById("construccion-flash-block");
    if (el) el.remove();
  }, []);

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[200] flex flex-col overflow-hidden bg-lad-black"
      >
        {/* Videos de fondo */}
        <VideoMosaic />

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-lad-black/70" />

        {/* Canvas de partículas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-[1]" />

        {/* Contenido */}
        <div className="relative z-[2] flex flex-1 flex-col items-center justify-center gap-8 px-6 text-center">
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
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-lad-red" />
              <span className="text-xs font-bold uppercase tracking-[0.45em] text-lad-red">
                Sitio en construcción
              </span>
              <div className="h-px w-12 bg-lad-red" />
            </div>

            <h1 className="font-display text-4xl font-black uppercase tracking-wider text-white md:text-6xl lg:text-7xl">
              Laboratorio<br />
              <span className="text-lad-red">de Apoyo y</span><br />
              Diagnóstico
            </h1>

            <p className="mx-auto max-w-lg text-justify text-base leading-relaxed text-gray-300">
              Estamos construyendo algo increíble para ti. Pronto tendremos lista nuestra nueva
              plataforma con todos nuestros servicios de diagnóstico clínico.
            </p>

            {/* Badge ISO */}
            <div className="flex items-center justify-center gap-2 pt-2">
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
      </div>
    </AnimatePresence>
  );
}
