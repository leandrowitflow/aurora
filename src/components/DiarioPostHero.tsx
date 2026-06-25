import { CmsImage } from "@/components/CmsImage";
import { HeroBlobDecoration } from "@/components/PageDecorations";

interface DiarioPostHeroProps {
  imageSrc: string;
  imageAlt: string;
}

export function DiarioPostHero({ imageSrc, imageAlt }: DiarioPostHeroProps) {
  return (
    <section className="site-hero site-hero--decorated diario-post-hero">
      <div className="absolute inset-0 z-0">
        <CmsImage
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <HeroBlobDecoration />
    </section>
  );
}
