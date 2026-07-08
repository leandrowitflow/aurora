"use client";

import { useEffect, useRef, useState } from "react";

type DecorativeShapeImageProps = {
  src: string;
  className?: string;
};

export function DecorativeShapeImage({
  src,
  className = "object-contain",
}: DecorativeShapeImageProps) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: isMobile ? "0px" : "240px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <span ref={hostRef} className="absolute inset-0" aria-hidden />
      {show ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          decoding="async"
          loading="lazy"
          fetchPriority="low"
          className={`absolute inset-0 size-full ${className}`}
        />
      ) : null}
    </>
  );
}
