// src/components/TopBar.jsx
import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function TopBar() {
  return (
    <div
      id="topbar"
      className="fixed top-0 inset-x-0 z-50 bg-slate-900 text-white border-b border-slate-800/60"
    >
      {/* Altura FIJA: 32px => h-8. Mantiene una sola línea y centra vertical */}
      <div className="mx-auto max-w-7xl h-8 px-4 flex items-center justify-between text-xs sm:text-[13px]">
        {/* Ubicación */}
        <div className="flex min-w-0 items-center gap-2 text-white/90">
          <FaMapMarkerAlt className="text-orange-500 shrink-0" />
          <span className="truncate">Santa Fe Capital y alrededores</span>
        </div>

        {/* Contacto */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+543425829061"
            className="inline-flex items-center gap-2 hover:underline whitespace-nowrap"
            rel="nofollow"
            aria-label="Llamar al 342-5829061"
          >
            <FaPhoneAlt className="text-orange-500 shrink-0" />
            <span>342-5829061</span>
          </a>

          {/* Mostrar email solo en pantallas grandes para que no rompa la altura */}
          <a
            href="mailto:construsantafeinfo@gmail.com"
            className="hidden lg:inline-flex items-center gap-2 hover:underline whitespace-nowrap"
            rel="nofollow"
            aria-label="Enviar email a construsantafeinfo@gmail.com"
          >
            <FaEnvelope className="text-orange-500 shrink-0" />
            <span className="truncate">construsantafeinfo@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
