"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

type InViewImageProps = ImageProps & {
  rootMargin?: string;
};

export function InViewImage({
  rootMargin,
  className,
  style,
  loading: _loading,
  fetchPriority: _fetchPriority,
  ...props
}: InViewImageProps) {
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
    const margin = rootMargin ?? (isMobile ? "0px" : "200px");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  if (props.fill) {
    return (
      <>
        <span ref={hostRef} className="absolute inset-0" aria-hidden />
        {show ? (
          <Image
            {...props}
            className={className}
            style={style}
            loading="lazy"
            fetchPriority="low"
          />
        ) : null}
      </>
    );
  }

  return show ? (
    <Image
      {...props}
      className={className}
      style={style}
      loading="lazy"
      fetchPriority="low"
    />
  ) : (
    <span ref={hostRef} aria-hidden />
  );
}
