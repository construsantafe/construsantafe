import { useEffect, useRef, useState } from "react";

export default function useNearViewport({ rootMargin = "800px" } = {}) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    if (!ref.current || near) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setNear(true),
      { rootMargin }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [near]);

  return { ref, near };
}
