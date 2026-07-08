"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CookieConsent = dynamic(
  () => import("@/components/CookieConsent").then((module) => module.CookieConsent),
  { ssr: false },
);

export function LazyCookieConsent() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      if (!cancelled) {
        setShouldLoad(true);
      }
    };

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const idleTimeout = isMobile ? 8000 : 4000;

    const useIdleCallback = typeof window.requestIdleCallback === "function";
    const idleId = useIdleCallback
      ? window.requestIdleCallback(load, { timeout: idleTimeout })
      : window.setTimeout(load, idleTimeout);

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

  return <CookieConsent />;
}
