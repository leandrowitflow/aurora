import { isRemoteCmsImage } from "@/lib/cms/posts";
import Image from "next/image";
import type { CSSProperties } from "react";

interface CmsImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}

export function CmsImage({
  src,
  alt,
  className = "",
  fill = false,
  width,
  height,
  sizes,
  priority = false,
}: CmsImageProps) {
  if (isRemoteCmsImage(src)) {
    const fillStyle: CSSProperties | undefined = fill
      ? {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }
      : undefined;

    return (
      // eslint-disable-next-line @next/next/no-img-element -- CMS covers live on Supabase; native img avoids optimizer host restrictions.
      <img
        src={src}
        alt={alt}
        className={className}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={fillStyle}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 675}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
