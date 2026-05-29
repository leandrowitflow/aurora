import Image from "next/image";
import { Button } from "@/components/Button";
import { epilogue } from "@/lib/fonts";

export function Hero() {
  return (
    <section className="relative min-h-[560px] sm:min-h-[600px] lg:min-h-[640px] xl:min-h-[720px] 2xl:min-h-[1018px]">
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.41)] from-40% to-[rgba(115,115,115,0)]" />

      <div className="relative mx-auto flex h-full min-h-[560px] max-w-[1920px] flex-col justify-center px-page pb-14 pt-28 sm:min-h-[600px] sm:pb-14 sm:pt-32 lg:min-h-[640px] lg:pt-36 xl:min-h-[720px] xl:pt-36 2xl:min-h-[1018px] 2xl:pb-20 2xl:pt-40">
        <h1
          className={`${epilogue.className} max-w-[420px] text-4xl font-bold leading-none text-white lg:max-w-[360px] lg:text-[32px] xl:max-w-[400px] xl:text-[40px] 2xl:max-w-[420px] 2xl:text-[64px]`}
        >
          Olá, Prima!
        </h1>
        <p className="mt-4 max-w-[616px] font-[family-name:var(--font-manrope)] text-base leading-none text-white lg:mt-4 lg:max-w-[480px] lg:text-[15px] xl:mt-5 xl:max-w-[540px] xl:text-[17px] 2xl:mt-5 2xl:max-w-[616px] 2xl:text-[20px]">
          A antiga escola primária de Olhão está a transformar-se numa casa de encontro aberta ao mundo.
        </p>
        <div className="mt-6 lg:mt-6 2xl:mt-8">
          <Button href="#quem-somos" label="Quem Somos" variant="mustard" />
        </div>
      </div>
    </section>
  );
}
