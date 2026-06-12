"use client";

import { NavLink } from "@/components/NavLink";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/nav-links";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-12 w-12 items-center justify-center"
      >
        <span
          className={`absolute block h-0.5 w-6 bg-olive transition-all duration-200 ${
            open ? "translate-y-0 rotate-45" : "-translate-y-2"
          }`}
        />
        <span
          className={`absolute block h-0.5 w-6 bg-olive transition-all duration-200 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`absolute block h-0.5 w-6 bg-olive transition-all duration-200 ${
            open ? "translate-y-0 -rotate-45" : "translate-y-2"
          }`}
        />
      </button>

      {open ? (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 top-[80px] z-40 bg-black/30 lg:top-[100px]"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <nav
        id="mobile-nav-panel"
        className={`absolute inset-x-0 top-full z-50 overflow-hidden border-t border-olive/10 bg-white shadow-lg transition-all duration-200 xl:hidden ${
          open ? "visible opacity-100" : "invisible max-h-0 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <ul className="flex flex-col gap-1 px-page py-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                label={link.label}
                onClick={() => setOpen(false)}
                className="block py-3"
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
