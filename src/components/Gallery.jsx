// src/components/Gallery.jsx
import React, { useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const isVideo = (src) => /\.mp4($|\?)/i.test(src);
const canWebpFrom = (src) => /\.(jpe?g|png)$/i.test(src);
const toWebp = (src) => src.replace(/\.(jpe?g|png)$/i, ".webp");

// Imagen optimizada con <picture> (WebP + fallback)
function ImgSmart({
  src,
  alt,
  eager = false,
  className = "",
  decorative = false,
  sizes = "(max-width: 640px) 100vw, 960px",
  fetchPriority,
  style,
}) {
  const webp = canWebpFrom(src) ? toWebp(src) : null;
  return (
    <picture>
      {webp && <source type="image/webp" srcSet={webp} />}
      <img
        src={src}
        alt={decorative ? "" : alt}
        aria-hidden={decorative ? "true" : undefined}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchpriority={fetchPriority}
        sizes={sizes}
        className={className}
        style={style}
      />
    </picture>
  );
}

const MEDIA = [
  { src: "/imagenesreales/baño1.jpg", caption: "Inicio de obra" },
  { src: "/imagenesreales/baño2.jpg", caption: "Colocación de cerámicos" },
  { src: "/imagenesreales/baño3.jpg", caption: "Avance de revestimiento" },
  { src: "/imagenesreales/ceramica1.jpg", caption: "Colocación de porcelanato" },
  { src: "/imagenesreales/ceramicabaño2.jpg", caption: "Detalle de juntas" },
  { src: "/imagenesreales/ceramicabaño3.jpg", caption: "Colocación de porcelanato en progreso" },
  { src: "/imagenesreales/camaraseptica.jpg", caption: "Cámara séptica — Excavación" },
  { src: "/imagenesreales/camaraseptica1.jpg", caption: "Cámara séptica — Trabajo en profundidad" },
  { src: "/imagenesreales/colocacionmedidor1.jpg", caption: "Medidor — Excavación y preparación" },
  { src: "/imagenesreales/colocacionmedidor2.jpg", caption: "Medidor colocado" },
  { src: "/imagenesreales/colocacionpisopvc.jpg", caption: "Piso PVC — Preparación y nivelación" },
  { src: "/imagenesreales/colocacionpisopvc2.jpg", caption: "Piso PVC — Piezas instaladas" },
  { src: "/imagenesreales/paredcolocacion1.jpg", caption: "Pared — Venecitas en progreso" },
  { src: "/imagenesreales/paredcolocacion2.jpg", caption: "Pared — Venecitas finalizado" },
  { src: "/imagenesreales/piezacolocacionceramicaypintura.jpg", caption: "Pieza — Preparación de muros" },
  { src: "/imagenesreales/piezacolocacionceramicaypintura1.jpg", caption: "Habitación — Colocación de cerámica" },
  { src: "/imagenesreales/piezacolocacionceramicaypintura2.jpg", caption: "Habitación — Zócalos y terminación" },
  { src: "/imagenesreales/piscina1.jpg", caption: "Piscina — Estructura" },
  { src: "/imagenesreales/piscina2.jpg", caption: "Piscina — Progreso" },
  { src: "/imagenesreales/piscina3.jpg", caption: "Piscina — Terminación" },
  { src: "/imagenesreales/poste-iluminacion-basecemento.jpg", caption: "Poste — Zanjeo para cableado" },
  { src: "/imagenesreales/poste-iluminacion-basecemento1.jpg", caption: "Poste — Base" },
  { src: "/imagenesreales/poste-iluminacion-basecemento2.jpg", caption: "Poste — Hormigonado final" },
  { src: "/imagenesreales/baseyhornobarro1.jpg", caption: "Base de horno de barro — Estructura" },
  { src: "/imagenesreales/baseyhornobarro2.jpg", caption: "Base de horno de barro — Progreso" },
  { src: "/imagenesreales/baseyhornobarro3.jpg", caption: "Base de horno de barro — Progreso" },
  { src: "/imagenesreales/baseyhornobarro4.jpg", caption: "Base de horno de barro — Progreso" },
  { src: "/imagenesreales/baseyhornobarro5.jpg", caption: "Horno de barro — Progreso" },
  { src: "/imagenesreales/baseyhornobarro6.jpg", caption: "Horno de barro — Finalizado" },
  { src: "/imagenesreales/quincho.jpg", caption: "Quincho — Estructura de madera" },
  { src: "/imagenesreales/revoque2.jpg", caption: "Revoque — Etapa 1" },
  { src: "/imagenesreales/revoque1.jpg", caption: "Revoque — Etapa 2" },
  { src: "/imagenesreales/revoqueyconstru1.jpg", caption: "Obra — Revoque" },
  { src: "/imagenesreales/revoqueyconstru2.jpg", caption: "Obra — Revoque" },
  { src: "/imagenesreales/revoqueyconstru3.jpg", caption: "Obra — Revoque" },
  { src: "/imagenesreales/revoqueyconstru4.jpg", caption: "Obra — Revoque" },
  { src: "/imagenesreales/revoqueyconstru5.jpg", caption: "Obra — Revoque" },
];

const SLIDE_H = "h-[clamp(320px,60vh,720px)]";

/** Máscara para blur sólo en los laterales (centro transparente). */
const sideBlurMaskStyle = {
  WebkitMaskImage:
    "linear-gradient(to right, black 0%, black 12%, transparent 30%, transparent 70%, black 88%, black 100%)",
  maskImage:
    "linear-gradient(to right, black 0%, black 12%, transparent 30%, transparent 70%, black 88%, black 100%)",
};

export default function Gallery() {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const autoplay = useRef(
    Autoplay({
      delay: 5200,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      playOnInit: !prefersReduced,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", containScroll: "trimSnaps" },
    [autoplay.current]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    autoplay.current?.reset();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => emblaApi?.off("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  // Lightbox
  const [isOpen, setIsOpen] = React.useState(false);
  const [lightIdx, setLightIdx] = React.useState(0);
  const openLightbox = (i) => {
    setLightIdx(i);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft")
        setLightIdx((i) => (i + MEDIA.length - 1) % MEDIA.length);
      if (e.key === "ArrowRight")
        setLightIdx((i) => (i + 1) % MEDIA.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <section id="galeria" className="py-20 sm:py-24 relative">
      {/* Reglas locales para asegurar object-contain */}
      <style>{`
        #galeria .media-contain { object-fit: contain !important; }
        #galeria .media-cover   { object-fit: cover !important; }
        #galeria picture, #galeria picture > img { display: block; }
        #galeria img, #galeria video { max-width: 100%; height: 100%; }
      `}</style>

      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">
          Galería de Trabajos
        </h2>

        <div className="relative">
          {/* Flechas */}
          <button
            onClick={scrollPrev}
            aria-label="Anterior"
            className="absolute left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 grid place-items-center rounded-full bg-white/90 backdrop-blur border border-slate-200 shadow-md hover:shadow-lg"
          >
            ‹
          </button>
          <button
            onClick={scrollNext}
            aria-label="Siguiente"
            className="absolute right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 grid place-items-center rounded-full bg-white/90 backdrop-blur border border-slate-200 shadow-md hover:shadow-lg"
          >
            ›
          </button>

          {/* Viewport */}
          <div ref={emblaRef} className="embla overflow-hidden rounded-3xl shadow-md md:shadow-lg">
            <div className="flex">
              {MEDIA.map((m, i) => {
                const video = isVideo(m.src);
                return (
                  <div key={m.src} className="flex-[0_0_100%]">
                    <div className={`relative w-full ${SLIDE_H} overflow-hidden isolation-auto`}>
                      {/* Fondo borroso sólo en laterales */}
                      {!video ? (
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={sideBlurMaskStyle}
                        >
                          <ImgSmart
                            src={m.src}
                            decorative
                            className="absolute inset-0 w-full h-full media-cover blur-2xl scale-110"
                          />
                        </div>
                      ) : (
                        <div className="pointer-events-none absolute inset-0" style={sideBlurMaskStyle}>
                          <div className="absolute inset-0 bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 blur-2xl" />
                        </div>
                      )}

                      {/* Media principal */}
                      <div className="relative z-10 w-full h-full flex items-center justify-center">
                        {video ? (
                          <video
                            src={m.src}
                            poster={m.poster}
                            className="w-full h-full media-contain rounded-md"
                            muted
                            playsInline
                          />
                        ) : (
                          <ImgSmart
                            src={m.src}
                            alt={m.caption}
                            eager={i === 0}
                            fetchPriority={i === 0 ? "high" : undefined}
                            className="w-full h-full media-contain rounded-md"
                            style={{ objectFit: "contain" }}
                          />
                        )}

                        {/* Click para zoom */}
                        <button
                          onClick={() => openLightbox(i)}
                          className="absolute inset-0 cursor-zoom-in"
                          aria-label={`Ampliar ${m.caption}`}
                          title="Ampliar"
                        />
                      </div>

                      {/* Caption */}
                      {m.caption && (
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-3 z-[11]">
                          <span className="px-3 py-1 text-xs md:text-sm text-slate-800 bg-white/90 backdrop-blur rounded-full shadow-md max-w-[88vw] md:max-w-[75%] inline-block text-center">
                            {m.caption}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Fin carrusel */}
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-3"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-[96vw] max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo(MEDIA[lightIdx].src) ? (
              <video
                src={MEDIA[lightIdx].src}
                poster={MEDIA[lightIdx].poster}
                controls
                autoPlay
                className="max-w-full max-h-[90vh] media-contain rounded-lg"
              />
            ) : (
              <picture>
                {canWebpFrom(MEDIA[lightIdx].src) && (
                  <source type="image/webp" srcSet={toWebp(MEDIA[lightIdx].src)} />
                )}
                <img
                  src={MEDIA[lightIdx].src}
                  alt={MEDIA[lightIdx].caption}
                  className="max-w-full max-h-[90vh] media-contain rounded-lg"
                  loading="eager"
                  decoding="async"
                  style={{ objectFit: "contain" }}
                />
              </picture>
            )}

            <button
              onClick={closeLightbox}
              className="absolute top-3 right-3 text-white/95 bg-white/10 hover:bg-white/20 rounded-full px-3 py-1"
              aria-label="Cerrar"
            >
              ✕
            </button>
            <button
              onClick={() =>
                setLightIdx((i) => (i + MEDIA.length - 1) % MEDIA.length)
              }
              aria-label="Anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white/95 bg-white/10 hover:bg-white/20 rounded-full px-3 py-2"
            >
              ‹
            </button>
            <button
              onClick={() => setLightIdx((i) => (i + 1) % MEDIA.length)}
              aria-label="Siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/95 bg-white/10 hover:bg-white/20 rounded-full px-3 py-2"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
