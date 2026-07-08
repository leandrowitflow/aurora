"use client";

import { HeroBlobDecoration } from "@/components/PageDecorations";
import { useEffect, useState } from "react";

export function DeferredHeroBlob() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (!isMobile) {
      setShow(true);
      return;
    }

    let cancelled = false;
    const reveal = () => {
      if (!cancelled) {
        setShow(true);
      }
    };

    const timer = window.setTimeout(reveal, 3500);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  if (!show) {
    return null;
  }

  return <HeroBlobDecoration />;
}
