export function PartnersLogos({ className = "" }: { className?: string }) {
  return (
    <div className={`min-w-0 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/partners-logos.png"
        alt="Parceiros e apoios"
        width={1558}
        height={85}
        className="partners-logos__image block h-auto w-full max-w-full object-contain object-left opacity-95"
      />
    </div>
  );
}
