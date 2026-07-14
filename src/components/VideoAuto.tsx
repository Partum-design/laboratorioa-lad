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
  // Refs para que callbacks/valores "inestables" (recreados en cada render del
  // padre) no obliguen a re-montar los listeners ni a reiniciar el video.
  const onEndedRef = useRef(onEnded);
  const stopAtRef = useRef(stopAt);
  const loopRef = useRef(loop);
  const activeRef = useRef(active);
  onEndedRef.current = onEnded;
  stopAtRef.current = stopAt;
  loopRef.current = loop;
  activeRef.current = active;

  // Montaje de listeners: solo depende de la fuente, no de callbacks inline.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    v.muted = true;
    v.volume = 0;

    const tryPlay = () => {
      if (!activeRef.current) return;
      v.muted = true;
      v.play().catch(() => {});
    };

    v.addEventListener("canplay", tryPlay);
    const handleEnded = () => {
      if (!activeRef.current) return;
      onEndedRef.current?.();
    };
    v.addEventListener("ended", handleEnded);
    const stopAtTime = () => {
      if (!activeRef.current) return;
      const limit = stopAtRef.current;
      if (limit !== undefined && v.currentTime >= limit) {
        if (loopRef.current) {
          v.currentTime = 0;
        } else {
          v.pause();
          onEndedRef.current?.();
        }
      }
    };
    v.addEventListener("timeupdate", stopAtTime);

    return () => {
      v.removeEventListener("canplay", tryPlay);
      v.removeEventListener("ended", handleEnded);
      v.removeEventListener("timeupdate", stopAtTime);
    };
  }, [src]);

  // Play/pause: solo reacciona a cambios reales de "active".
  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    if (active) {
      v.currentTime = 0;
      v.muted = true;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active]);

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
