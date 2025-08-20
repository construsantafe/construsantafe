import React, { useEffect } from "react";
import useNearViewport from "./hooks/useNearViewport";

export default function PrefetchGallery() {
  const { ref, near } = useNearViewport({ rootMargin: "800px" });

  useEffect(() => {
    if (near) import("./Gallery"); // pre-descarga el chunk
  }, [near]);

  return <div ref={ref} aria-hidden="true" />;
}
