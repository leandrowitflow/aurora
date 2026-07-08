"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HomeBannerCarouselClient = dynamic(
  () =>
    import("@/components/HomeBannerCarouselClient").then(
      (module) => module.HomeBannerCarouselClient,
    ),
  { ssr: false },
);

const MOBILE_HYDRATE_DELAY_MS = 5000;

export function DeferredHomeBannerCarouselClient() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (!isMobile) {
      setReady(true);
      return;
    }

    let cancelled = false;
    const mount = () => {
      if (!cancelled) {
        setReady(true);
      }
    };

    const section = document.querySelector(".home-carousel");
    section?.addEventListener("click", mount, { once: true, passive: true });
    section?.addEventListener("touchstart", mount, { once: true, passive: true });

    const timer = window.setTimeout(mount, MOBILE_HYDRATE_DELAY_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      section?.removeEventListener("click", mount);
      section?.removeEventListener("touchstart", mount);
    };
  }, []);

  if (!ready) {
    return null;
  }

  return <HomeBannerCarouselClient />;
}
