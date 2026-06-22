"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AuroraAssistant = dynamic(
  () =>
    import("@/components/AuroraAssistant").then((module) => module.AuroraAssistant),
  { ssr: false },
);

export function LazyAuroraAssistant() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      if (!cancelled) {
        setShouldLoad(true);
      }
    };

    const useIdleCallback = typeof window.requestIdleCallback === "function";
    const idleId = useIdleCallback
      ? window.requestIdleCallback(load, { timeout: 6000 })
      : window.setTimeout(load, 6000);

    window.addEventListener("pointerdown", load, { once: true, passive: true });
    window.addEventListener("keydown", load, { once: true });
    window.addEventListener("scroll", load, { once: true, passive: true });

    return () => {
      cancelled = true;
      if (useIdleCallback) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return <AuroraAssistant />;
}
