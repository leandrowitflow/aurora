export function PartnersBar() {
  return (
    <section className="pb-10 pt-0 sm:pb-14 lg:pb-16">
      <div className="mx-auto max-w-[1840px] px-page">
        <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/partners-logos.png"
            alt="Parceiros e apoios"
            width={1841}
            height={90}
            className="h-[52px] w-max max-w-none object-contain sm:h-[68px] lg:h-[90px] lg:w-full lg:max-w-full"
          />
        </div>
      </div>
    </section>
  );
}
