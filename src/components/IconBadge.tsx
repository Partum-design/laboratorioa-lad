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

// Caja sólida tipo "sticker": fondo a color + ícono (blanco por defecto, o iconColor si se pasa).
export function IconBadge({ color, iconColor = "#ffffff", children, className = "h-10 w-10", rotate = 8, idle = false }: IconBadgeProps) {
  return (
    <motion.div
      className={`flex shrink-0 items-center justify-center ${className}`}
      style={{ backgroundColor: color, color: iconColor }}
      initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ scale: 1.12, rotate }}
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

// Versión sin caja: ícono inline a color, con leve pop al hover. Para íconos junto a texto (no en tarjeta).
export function IconChip({ color, children, size = "h-5 w-5" }: IconChipProps) {
  return (
    <motion.span
      className={`inline-flex shrink-0 items-center justify-center ${size}`}
      style={{ color }}
      initial={{ scale: 0.7, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ scale: 1.2, rotate: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 14 }}
    >
      {children}
    </motion.span>
  );
}
