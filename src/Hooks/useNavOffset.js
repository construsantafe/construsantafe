// src/hooks/useNavOffset.js
import { useEffect } from "react";

export default function useNavOffset() {
  useEffect(() => {
    const setOffset = () => {
      const top = document.getElementById("topbar");
      const header = document.getElementById("site-header");
      const extra = 8; // respirito
      const offset =
        (top?.offsetHeight || 0) + (header?.offsetHeight || 0) + extra;

      document.documentElement.style.setProperty("--nav-offset", `${offset}px`);
    };

    setOffset();

    // Actualiza si cambia el tamaño o si las fuentes/recursos recalculan altura
    const ro = new ResizeObserver(setOffset);
    const top = document.getElementById("topbar");
    const header = document.getElementById("site-header");
    top && ro.observe(top);
    header && ro.observe(header);

    window.addEventListener("resize", setOffset);
    window.addEventListener("orientationchange", setOffset);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setOffset);
      window.removeEventListener("orientationchange", setOffset);
    };
  }, []);
}
