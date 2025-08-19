// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col gap-2">
          <strong className="text-lg text-white">Construsantafe</strong>
          <p className="text-sm text-slate-400">
            Soluciones en construcción, electricidad y remodelaciones en Santa Fe y alrededores.
          </p>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Construsantafe. Todos los derechos reservados.</span>
          <a
            href="#inicio"
            className="hover:text-white transition"
            aria-label="Volver arriba"
          >
            Volver arriba ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
