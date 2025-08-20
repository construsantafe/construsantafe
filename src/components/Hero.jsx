// src/components/Hero.jsx
import React from "react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[86vh] md:h-[88vh] flex items-center justify-center text-white text-center overflow-hidden scroll-mt-[var(--nav-offset,112px)]"
    >
      {/* Fondo responsive (AVIF > WebP > JPEG) usando las variantes santafe1-*.{avif,webp} */}
      <picture>
        {/* AVIF primero */}
        <source
          type="image/avif"
          srcSet={[
            "/images/santafe1-600.avif 600w",
            "/images/santafe1-900.avif 900w",
            "/images/santafe1-1200.avif 1200w",
            "/images/santafe1-1600.avif 1600w",
          ].join(", ")}
          sizes="100vw"
        />
        {/* WebP de respaldo */}
        <source
          type="image/webp"
          srcSet={[
            "/images/santafe1-600.webp 600w",
            "/images/santafe1-900.webp 900w",
            "/images/santafe1-1200.webp 1200w",
            "/images/santafe1-1600.webp 1600w",
          ].join(", ")}
          sizes="100vw"
        />
        {/* JPEG fallback */}
        <img
          src="/images/santafe1.jpg"
          alt="Vista aérea de Santa Fe Capital"
          className="absolute inset-0 w-full h-full object-cover md:bg-fixed will-change-transform"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width="1600"
          height="900"
        />
      </picture>

      {/* Vignette global */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/60" />

      {/* Placa de contraste detrás del contenido */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-4xl h-[58%] md:h-[54%] rounded-[2.5rem] bg-black/18 blur-[22px]" />

      {/* Contenido */}
      <div className="relative z-10 px-5 sm:px-6 max-w-6xl">
        <h1
          className="
            text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight sm:leading-[1.15]
            drop-shadow-[0_6px_30px_rgba(0,0,0,0.65)]
            mb-6
          "
          style={{ textWrap: "balance" }}
        >
          Construcción, Electricidad y
          <br className="hidden sm:block" />
          remodelaciones en{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-red-500">
            Santa Fe
          </span>
        </h1>

        <p
          className="
            mx-auto max-w-[60ch]
            text-[15px] sm:text-base md:text-lg
            text-white/90 leading-relaxed
            mb-7 sm:mb-8
          "
        >
          Más de 10 años garantizando calidad, cumpliendo plazos y ofreciendo
          atención personalizada para tu hogar o comercio.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
          <a
            href="#contacto"
            aria-label="Ir a contacto para solicitar presupuesto"
            className="
              inline-flex items-center gap-2.5 rounded-2xl
              bg-gradient-to-r from-orange-600 to-red-500
              px-6 sm:px-7 py-3.5 sm:py-4
              font-semibold text-white
              shadow-lg hover:shadow-xl
              transition-transform hover:-translate-y-0.5
              focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70
            "
          >
            <span aria-hidden className="text-xl">🟠</span>
            Solicitar presupuesto
          </a>

          <a
            href="#servicios"
            aria-label="Ver servicios"
            className="
              inline-flex items-center gap-2.5 rounded-2xl
              border border-white/20 bg-white/10
              px-6 sm:px-7 py-3.5 sm:py-4
              font-semibold text-white backdrop-blur
              hover:bg-white/15
              transition-transform hover:-translate-y-0.5
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
            "
          >
            <span aria-hidden className="text-xl">⚙️</span>
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  );
}
