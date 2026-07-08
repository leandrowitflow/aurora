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

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (isMobile) {
      window.addEventListener("pointerdown", load, { once: true, passive: true });
      window.addEventListener("keydown", load, { once: true });

      return () => {
        cancelled = true;
        window.removeEventListener("pointerdown", load);
        window.removeEventListener("keydown", load);
      };
    }

    const useIdleCallback = typeof window.requestIdleCallback === "function";
    const idleId = useIdleCallback
      ? window.requestIdleCallback(load, { timeout: 10000 })
      : window.setTimeout(load, 10000);

    window.addEventListener("pointerdown", load, { once: true, passive: true });
    window.addEventListener("keydown", load, { once: true });

    return () => {
      cancelled = true;
      if (useIdleCallback) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
      window.removeEventListener("pointerdown", load);
      window.removeEventListener("keydown", load);
    };
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return <AuroraAssistant />;
}
