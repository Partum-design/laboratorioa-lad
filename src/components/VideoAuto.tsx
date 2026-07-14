"use client";

import { useEffect, useRef } from "react";

interface VideoAutoProps {
  src: string;
  className?: string;
  loop?: boolean;
  onEnded?: () => void;
  stopAt?: number;
  /** Si se pasa, el video queda montado siempre (sin recarga de red) y solo
   * reproduce cuando active=true, evitando el "trabón" al cambiar de fuente. */
  active?: boolean;
}

export default function VideoAuto({ src, className = "", loop = true, onEnded, stopAt, active = true }: VideoAutoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // Forzar muted imperativo — React no siempre lo sincroniza al atributo real
    v.muted = true;
    v.volume = 0;

    const tryPlay = () => {
      if (!active) return;
      v.muted = true;
      v.play().catch(() => {});
    };

    if (active) {
      v.currentTime = 0;
      tryPlay();
    } else {
      v.pause();
    }

    // También en canplay por si aún no cargó
    v.addEventListener("canplay", tryPlay);
    if (onEnded) v.addEventListener("ended", onEnded);
    const stopAtTime = () => {
      if (stopAt !== undefined && v.currentTime >= stopAt) {
        if (loop) {
          v.currentTime = 0;
        } else {
          v.pause();
          onEnded?.();
        }
      }
    };
    if (stopAt !== undefined) v.addEventListener("timeupdate", stopAtTime);

    return () => {
      v.removeEventListener("canplay", tryPlay);
      if (onEnded) v.removeEventListener("ended", onEnded);
      if (stopAt !== undefined) v.removeEventListener("timeupdate", stopAtTime);
    };
  }, [src, onEnded, stopAt, loop, active]);

  return (
    <video
      ref={ref}
      src={src}
      loop={loop}
      playsInline
      preload="auto"
      disablePictureInPicture
      className={className}
      // NO autoPlay aquí — lo forzamos con play() en useEffect
    />
  );
}
