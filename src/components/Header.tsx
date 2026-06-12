"use client";

import { DesktopNav } from "@/components/DesktopNav";
import { MobileNav } from "@/components/MobileNav";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={`absolute inset-x-0 top-0 z-50 transition-colors duration-200 ${
        isHome ? "bg-transparent" : "bg-white"
      }`}
    >
      <div className="relative mx-auto flex h-[80px] max-w-[1920px] items-center justify-between px-page lg:h-[100px] xl:h-[122px]">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Coletivo Aurora"
            width={80}
            height={79}
            priority
          />
        </Link>

        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
}
