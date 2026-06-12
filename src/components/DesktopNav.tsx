"use client";

import { NavLink } from "@/components/NavLink";
import { NAV_LINKS } from "@/lib/nav-links";

export function DesktopNav() {
  return (
    <nav className="hidden items-center gap-8 xl:flex" aria-label="Principal">
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          label={link.label}
          className="whitespace-nowrap"
        />
      ))}
    </nav>
  );
}
