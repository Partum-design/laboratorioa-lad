"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="select-none font-display text-[10rem] font-black leading-none text-lad-gray-light md:text-[12rem]">404</div>
          <div className="-mt-8 mb-8 h-1 w-16 bg-lad-red mx-auto" />
          <h1 className="mb-3 font-display text-3xl font-bold text-lad-black">Pagina no encontrada</h1>
          <p className="mx-auto mb-8 max-w-sm text-gray-500">La pagina que buscas no existe o fue movida.</p>
          <Link href="/" className="btn-primary">Regresar al inicio</Link>
        </motion.div>
      </div>
    </div>
  );
}
