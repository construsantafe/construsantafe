// src/components/Services.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  FaTools,
  FaBolt,
  FaPaintRoller,
  FaLayerGroup,
  FaHome,
} from "react-icons/fa";
import { HiOutlineChevronDown } from "react-icons/hi";

/**
 * Construye un <picture> responsive usando variantes -600 y -900 en AVIF/WebP
 * y deja de fallback el archivo original (jpg/png).
 */
function ResponsiveServiceImage({ src, alt }) {
  // src viene como "/images/archivo.ext"
  const dot = src.lastIndexOf(".");
  const base = src.slice(0, dot);
  const ext = src.slice(dot + 1); // "jpg" | "png" ...
  const sizes = "(max-width: 640px) 100vw, 600px"; // 1 col en móvil, 2–3 en desktop

  return (
    <picture>
      {/* AVIF primero */}
      <source
        type="image/avif"
        srcSet={`${base}-600.avif 600w, ${base}-900.avif 900w`}
        sizes={sizes}
      />
      {/* WebP de respaldo */}
      <source
        type="image/webp"
        srcSet={`${base}-600.webp 600w, ${base}-900.webp 900w`}
        sizes={sizes}
      />
      {/* Fallback al original */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full aspect-[16/10] object-cover select-none"
        style={{ contain: "layout paint" }}
        width={900}
        height={560}
      />
    </picture>
  );
}

/** Contenidos: solo “Detalles” al abrir. */
const services = [
  {
    title: "Albañilería y Revoques",
    image: "/images/solomen-i6V6diaf71A-unsplash.jpg",
    details: [
      "Planteo y construcción de paredes de ladrillos comunes, huecos y retak (8, 15, 20 y 30 cm) visto o rasado.",
      "Armado y encofrado de vigas, losas, columnas y bases.",
      "Revoque fino, grueso e impermeable.",
      "Colocación de premarcos y aberturas.",
    ],
    tags: ["Paredes", "Revoques", "Premarcos"],
    Icon: FaTools,
  },
  {
    title: "Revestimientos",
    image:
      "/images/colocacion-de-baldosas-ceramicas-aplicar-mortero-con-llana-sobre-un-piso-de-concreto-como-preparacion-para-la-colocacion-de-baldosas-blancas.jpg",
    details: [
      "Colocación de porcelanatos y cerámicos.",
      "Piedras lajas y venecitas.",
      "Adoquines y baldosas.",
    ],
    tags: ["Porcelanato", "Cerámicos", "Piedra/venecita"],
    Icon: FaLayerGroup,
  },
  {
    title: "Electricidad",
    image: "/images/electricidad1.jpg",
    details: [
      "Instalaciones domiciliarias completas.",
      "Mantenimiento y urgencias.",
      "Normalización de tableros y cableados según normativa vigente.",
    ],
    tags: ["Tableros", "Cableado", "Normativa"],
    Icon: FaBolt,
  },
  {
    title: "Durlock y Cielorrasos",
    image: "/images/durlock1.jpg",
    details: [
      "Cielorrasos de PVC y placas de yeso.",
      "Tabiques divisorios y fajas.",
      "Terminaciones finas con perfilería metálica.",
    ],
    tags: ["PVC", "Yeso", "Perfilería"],
    Icon: FaLayerGroup,
  },
  {
    title: "Pintura y Acabados",
    image: "/images/pintura1.jpg",
    details: [
      "Pintura interior y exterior.",
      "Enmasillado/enduido y sellado.",
      "Preparación de superficies para un resultado uniforme y duradero.",
    ],
    tags: ["Interior/Exterior", "Enduido", "Sellado"],
    Icon: FaPaintRoller,
  },
  {
    title: "Techos",
    image: "/images/techos1.jpg",
    details: [
      "Tirantes de madera vista o estructura metálica soldada.",
      "Impermeabilización.",
      "Terminación prolija.",
    ],
    tags: ["Madera", "Metálico", "Impermeable"],
    Icon: FaHome,
  },
];

export default function Services() {
  const [open, setOpen] = useState(Array(services.length).fill(false));
  const sheetRefs = useRef([]);

  const toggle = (i) =>
    setOpen((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  useEffect(() => {
    open.forEach((v, i) => {
      if (v && sheetRefs.current[i]) sheetRefs.current[i].focus();
    });
  }, [open]);

  return (
    <section
      id="servicios"
      className="scroll-mt-24 py-24 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="max-w-6xl mx-auto px-4">
        <header className="text-center mb-12">
          <p className="text-sm tracking-wide text-orange-600 font-semibold">
            ¿Qué hacemos?
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-1">
            Nuestros Servicios
          </h2>
          <p className="mt-3 text-slate-600 max-w-3xl mx-auto">
            Trabajamos obras chicas y medianas para hogares y comercios. Elegí
            un rubro y abrí los <b>detalles</b> para ver alcances y materiales.
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, image, details, tags, Icon }, i) => {
            const isOpen = open[i];

            return (
              <article
                key={title}
                className="group relative isolate rounded-3xl overflow-hidden bg-white ring-1 ring-slate-200 shadow-sm hover:shadow-xl hover:ring-orange-200 transition"
              >
                {/* Imagen optimizada */}
                <div className="relative overflow-hidden">
                  <ResponsiveServiceImage src={image} alt={title} />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/15 to-transparent" />
                </div>

                {/* Contenido */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center justify-center rounded-xl bg-orange-50 text-orange-700 ring-1 ring-orange-100 h-9 w-9">
                      <Icon aria-hidden className="text-[18px]" />
                    </span>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-900">
                      {title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-medium bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full border border-orange-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Botón con alto fijo para evitar saltos */}
                  <div className="min-h-[48px] flex items-center">
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      aria-controls={`sheet-${i}`}
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 font-semibold text-slate-800 hover:bg-slate-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300"
                    >
                      Detalles
                      <HiOutlineChevronDown
                        className={`transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Hoja interna */}
                <div
                  id={`sheet-${i}`}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={`sheet-title-${i}`}
                  tabIndex={-1}
                  ref={(el) => (sheetRefs.current[i] = el)}
                  onKeyDown={(e) => e.key === "Escape" && toggle(i)}
                  onClick={(e) => {
                    if (e.target === e.currentTarget) toggle(i);
                  }}
                  className={`absolute inset-x-0 bottom-0 z-10 rounded-b-3xl bg-white/95 backdrop-blur-sm border-t border-slate-200 shadow-[0_-8px_24px_rgba(2,6,23,.08)]
                    origin-bottom transform-gpu will-change-transform
                    transition-[transform,opacity] duration-300 ease-[cubic-bezier(.2,.7,.2,1)]
                    ${isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-0 pointer-events-none"}`}
                >
                  <div
                    className="p-5 max-h-64 md:max-h-72 lg:max-h-80 overflow-auto"
                    style={{ scrollbarGutter: "stable" }}
                  >
                    <p id={`sheet-title-${i}`} className="text-sm text-slate-600 mb-2">
                      Detalles
                    </p>
                    <ul className="pl-5 list-disc text-[15px] text-slate-800 space-y-1.5">
                      {details.map((d, idx) => (
                        <li key={idx}>{d}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-end border-t border-slate-200 p-3">
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
