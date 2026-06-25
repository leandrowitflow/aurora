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

    const useIdleCallback = typeof window.requestIdleCallback === "function";
    const idleId = useIdleCallback
      ? window.requestIdleCallback(load, { timeout: 4000 })
      : window.setTimeout(load, 4000);

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
