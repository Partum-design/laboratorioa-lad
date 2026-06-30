"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface IconBadgeProps {
  color: string;
  iconColor?: string;
  children: ReactNode;
  className?: string;
  rotate?: number;
  idle?: boolean;
}

// Contenedor técnico de esquinas suaves para la familia de iconos LAD.
export function IconBadge({ color, iconColor = "#ffffff", children, className = "h-10 w-10", rotate = 8, idle = false }: IconBadgeProps) {
  return (
    <motion.div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-[1.1rem] border border-white/20 shadow-[0_16px_30px_-18px_rgba(227,6,19,0.9)] after:absolute after:right-1.5 after:top-1.5 after:h-1 after:w-1 after:rounded-full after:bg-current after:opacity-30 [&>svg]:h-[60%] [&>svg]:w-[60%] ${className}`}
      style={{ backgroundColor: color, color: iconColor }}
      initial={{ scale: 0.82, opacity: 0, y: 8 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ scale: 1.05, y: -3, rotate: rotate / 4 }}
      animate={idle ? { y: [0, -3, 0] } : undefined}
      transition={
        idle
          ? { y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" }, default: { type: "spring", stiffness: 300, damping: 15 } }
          : { type: "spring", stiffness: 300, damping: 15 }
      }
    >
      {children}
    </motion.div>
  );
}

interface IconChipProps {
  color: string;
  children: ReactNode;
  size?: string;
}

// Versión inline para iconos junto a texto.
export function IconChip({ color, children, size = "h-5 w-5" }: IconChipProps) {
  return (
    <motion.span
      className={`inline-flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full ${size}`}
      style={{ color }}
      initial={{ scale: 0.85, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ scale: 1.08, y: -1 }}
      transition={{ type: "spring", stiffness: 320, damping: 14 }}
    >
      {children}
    </motion.span>
  );
}
