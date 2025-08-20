// src/routes/GalleryLazy.jsx
import { lazy, Suspense } from "react";

const Gallery = lazy(() => import("../components/Gallery")); 
// 👆 ojo: la ruta depende de dónde tengas Gallery.jsx.
// Como en tu estructura está en src/components/Gallery.jsx, el import correcto es "../components/Gallery"

export default function GalleryLazy() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Cargando...</div>}>
      <Gallery />
    </Suspense>
  );
}
