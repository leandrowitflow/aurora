"use client";

import { DesktopNav } from "@/components/DesktopNav";
import { MobileNav } from "@/components/MobileNav";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner site-container">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.svg"
            alt="Coletivo Aurora"
            width={80}
            height={79}
            loading="eager"
            className="h-auto w-[3.75rem] sm:w-16 lg:w-[3.5rem] xl:w-14 2xl:w-16"
          />
        </Link>

        <DesktopNav />
        <MobileNav />
      </div>
    </header>
  );
}
