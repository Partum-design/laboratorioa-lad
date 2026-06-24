"use client";

import { useEffect, useRef } from "react";

interface VideoAutoProps {
  src: string;
  className?: string;
  loop?: boolean;
  onEnded?: () => void;
}

export default function VideoAuto({ src, className = "", loop = true, onEnded }: VideoAutoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // Forzar muted imperativo — React no siempre lo sincroniza al atributo real
    v.muted = true;
    v.volume = 0;

    const tryPlay = () => {
      v.muted = true;
      v.play().catch(() => {});
    };

    // Intentar reproducir apenas el componente monta
    tryPlay();

    // También en canplay por si aún no cargó
    v.addEventListener("canplay", tryPlay);
    if (onEnded) v.addEventListener("ended", onEnded);

    return () => {
      v.removeEventListener("canplay", tryPlay);
      if (onEnded) v.removeEventListener("ended", onEnded);
    };
  }, [src, onEnded]);

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
