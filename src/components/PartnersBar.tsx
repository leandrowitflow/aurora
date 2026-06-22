import Image from "next/image";

export function PartnersLogos({ className = "" }: { className?: string }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <Image
        src="/images/partners-logos.png"
        alt="Parceiros e apoios"
        width={1558}
        height={85}
        sizes="(max-width: 640px) 100vw, 480px"
        loading="lazy"
        className="partners-logos__image block h-auto w-full max-w-full object-contain object-left opacity-95"
      />
    </div>
  );
}
