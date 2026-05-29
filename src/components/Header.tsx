import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/MobileNav";
import { NAV_LINKS } from "@/lib/nav-links";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-white">
      <div className="mx-auto flex h-[80px] max-w-[1920px] items-center justify-between px-page lg:h-[88px] 2xl:h-[122px]">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Coletivo Aurora"
            width={80}
            height={79}
            priority
            className="h-auto w-[4.5rem] sm:w-20 lg:w-16 xl:w-[72px] 2xl:w-[80px]"
          />
        </Link>

        <nav className="hidden items-center gap-4 lg:flex xl:gap-5 2xl:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap font-[family-name:var(--font-manrope)] text-[15px] font-bold text-olive transition-opacity hover:opacity-70 xl:text-[17px] 2xl:text-xl"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
