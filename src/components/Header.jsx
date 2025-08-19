// src/components/Header.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { FiHome, FiTool, FiImage, FiMail, FiChevronRight } from "react-icons/fi";

/* ========= Config ========= */
const WA_NUMBER = "543425829061";
const WA_TEXT = encodeURIComponent("Hola, vengo desde la web. Quisiera un presupuesto.");
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;
const LOGO_SRC = "/brand/logoconstrusantafe.svg";

/* Secciones del menú */
const SECTIONS = [
  { id: "inicio", label: "Inicio", icon: FiHome },
  { id: "servicios", label: "Servicios", icon: FiTool },
  { id: "galeria", label: "Galería", icon: FiImage },
  { id: "contacto", label: "Contacto", icon: FiMail },
];

/* ============ Mobile Menu (Portal + focus trap) ============ */
function MobileMenu({ open, onClose, onGo, active }) {
  const firstRef = useRef(null);
  const lastRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusables = document.querySelectorAll(
          '[data-mobilemenu] a, [data-mobilemenu] button'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) firstRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999] md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[rgba(9,13,23,0.68)] backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed inset-0 sm:inset-y-0 sm:right-0 sm:w-[380px]
                   bg-white shadow-2xl sm:rounded-l-3xl flex flex-col overflow-hidden
                   transition-transform duration-200 ease-out"
        style={{ height: "100dvh" }}
        data-mobilemenu
      >
        <div
          className="h-[60px] px-4 flex items-center justify-between border-b border-slate-200"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <div className="flex items-center gap-2">
            <img src={LOGO_SRC} alt="" className="h-9 w-auto" />
            <span className="font-semibold">Construsantafe</span>
          </div>
          <button
            className="p-2 rounded-md hover:bg-slate-100"
            onClick={onClose}
            aria-label="Cerrar menú"
            ref={firstRef}
          >
            <HiOutlineX size={22} />
          </button>
        </div>

        <div className="px-5 pt-3 pb-1 text-[12px] uppercase tracking-wide text-slate-400">
          Navegar
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-32">
          {SECTIONS.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => onGo(e, id)}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex items-center justify-between gap-3 px-3 py-4 rounded-xl transition
                  ${
                    isActive
                      ? "bg-orange-50 text-orange-600 ring-1 ring-orange-100"
                      : "text-slate-800 hover:bg-slate-50 active:bg-slate-100"
                  }`}
              >
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-7 w-2 rounded-full ${
                    isActive ? "bg-orange-500" : "bg-transparent"
                  }`}
                />
                <span className="flex items-center gap-3">
                  <Icon
                    className={`shrink-0 text-[20px] ${
                      isActive ? "text-orange-600" : "text-slate-500"
                    }`}
                  />
                  <span className="text-[16px] leading-none">{label}</span>
                </span>
                <FiChevronRight
                  className={`shrink-0 text-[20px] transition-transform ${
                    isActive ? "text-orange-500" : "text-slate-300"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div
          className="pointer-events-auto fixed left-0 right-0 bottom-0 px-4 pb-[max(18px,env(safe-area-inset-bottom))] pt-3
                     bg-gradient-to-t from-white via-white to-white/80"
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-[52px] inline-flex items-center justify-center gap-2 rounded-2xl font-semibold text-white bg-[#25D366] shadow-lg active:scale-[.99]"
            ref={lastRef}
          >
            <FaWhatsapp className="text-white" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ============ Header ============ */
export default function Header() {
  const [active, setActive] = useState("inicio");
  const activeRef = useRef("inicio");
  const [open, setOpen] = useState(false);

  /* Offset dinámico (TopBar + Header) */
  const offsetRef = useRef(132);
  useEffect(() => {
    const computeOffset = () => {
      const topbar = document.getElementById("topbar");
      const header = document.getElementById("site-header");
      const stack = (topbar?.offsetHeight || 0) + (header?.offsetHeight || 0);
      const extra = 8;
      const navOffset = stack + extra;
      offsetRef.current = navOffset;
      document.documentElement.style.setProperty("--nav-offset", `${navOffset}px`);
    };
    computeOffset();
    const ro = new ResizeObserver(computeOffset);
    const tb = document.getElementById("topbar");
    const hd = document.getElementById("site-header");
    tb && ro.observe(tb);
    hd && ro.observe(hd);
    window.addEventListener("resize", computeOffset);
    window.addEventListener("orientationchange", computeOffset);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", computeOffset);
      window.removeEventListener("orientationchange", computeOffset);
    };
  }, []);

  /* Bloquear scroll del fondo cuando el menú está abierto */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [open]);

  /* Hash inicial */
  useEffect(() => {
    const hash = (window.location.hash || "").replace("#", "");
    if (hash && SECTIONS.some((s) => s.id === hash)) {
      activeRef.current = hash;
      setActive(hash);
    }
  }, []);

  /* Scroll spy */
  useEffect(() => {
    const nodes = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        let cand = activeRef.current,
          best = 0;
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > best) {
            best = e.intersectionRatio;
            cand = e.target.id;
          }
        }
        if (cand !== activeRef.current) {
          activeRef.current = cand;
          setActive(cand);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -45% 0px" }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  /* Helper: scroll a sección compensando padding/border y el offset global */
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const cs = getComputedStyle(el);
    const padTop = parseFloat(cs.paddingTop || "0") || 0;
    const borderTop = parseFloat(cs.borderTopWidth || "0") || 0;
    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset +
      padTop +
      borderTop -
      offsetRef.current;

    activeRef.current = id;
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  /* Click en links del propio header */
  const onGo = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  /* --- Captura global de anchors con hash a nuestras secciones --- */
  useEffect(() => {
    const handler = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").replace("#", "");
      if (!SECTIONS.some((s) => s.id === id)) return; // ignorar otros anchors
      e.preventDefault();
      setOpen(false);
      scrollToId(id);
    };
    // captura en fase "capture" para adelantarnos al default del navegador
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  /* Estilos de links (desktop) */
  const linkCls = useMemo(
    () =>
      "relative group font-medium text-[15px] text-slate-900/90 hover:text-slate-900 transition-colors",
    []
  );
  const underline = (isActive) =>
    `pointer-events-none absolute -bottom-1 left-0 h-[2px] rounded-full bg-orange-600 transition-all duration-300 ${
      isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
    }`;

  return (
    <>
      <header
        id="site-header"
        className="fixed inset-x-0 top-8 z-40 border-b border-slate-200 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-[0_1px_10px_rgba(2,6,23,0.06)]"
      >
        <div className="max-w-7xl mx-auto px-4 h-[76px] md:h-[90px] flex items-center justify-between">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => onGo(e, "inicio")}
            className="flex items-center gap-3 shrink-0"
            aria-label="Ir a inicio"
          >
            <div className="h-[76px] md:h-[90px] flex items-center">
              <img
                src={LOGO_SRC}
                alt="Construsantafe"
                decoding="async"
                width={280}
                height={90}
                className="h-[68px] md:h-[76px] w-auto select-none"
              />
            </div>
            <span className="sr-only">Construsantafe</span>
          </a>

          {/* Menú Desktop */}
          <nav className="hidden md:flex items-center gap-10">
            {SECTIONS.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => onGo(e, id)}
                  className={`${linkCls} ${isActive ? "text-orange-600" : ""}`}
                >
                  {label}
                  <span className={underline(isActive)} />
                </a>
              );
            })}

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] text-white px-3 py-2.5 md:px-4 font-semibold shadow hover:shadow-md transition hover:-translate-y-0.5"
              aria-label="Abrir WhatsApp"
            >
              <FaWhatsapp className="text-white" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </nav>

          {/* Botón Mobile */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-slate-100"
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
          >
            <HiOutlineMenu size={26} />
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} onGo={onGo} active={active} />
    </>
  );
}
