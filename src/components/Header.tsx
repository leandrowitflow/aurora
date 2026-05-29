import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav-links";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-white">
      <div className="mx-auto flex h-[80px] max-w-[1920px] items-center justify-between px-page lg:h-[100px] xl:h-[122px]">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Coletivo Aurora"
            width={80}
            height={79}
            priority
          />
        </Link>
        <nav className="hidden items-center gap-8 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap font-[family-name:var(--font-manrope)] text-xl font-bold text-olive transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
