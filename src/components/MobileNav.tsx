"use client";

import { NavLink } from "@/components/NavLink";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/nav-links";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6" aria-hidden>
      <span
        className={`absolute left-0 block h-0.5 w-full bg-olive transition-all duration-200 ${
          open ? "top-[9px] rotate-45" : "top-0.5"
        }`}
      />
      <span
        className={`absolute left-0 top-[9px] block h-0.5 w-full bg-olive transition-opacity duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 block h-0.5 w-full bg-olive transition-all duration-200 ${
          open ? "top-[9px] -rotate-45" : "top-[17px]"
        }`}
      />
    </span>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="flex h-11 w-11 items-center justify-center rounded-md transition-colors hover:bg-olive/5"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((prev) => !prev)}
      >
        <MenuIcon open={open} />
      </button>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40"
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <nav
        id="mobile-nav"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[min(100%,20rem)] flex-col bg-white px-page pb-10 shadow-xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        style={{ paddingTop: "calc(var(--site-header-h) + 1.5rem)" }}
        aria-hidden={!open}
      >
        <ul className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                label={link.label}
                onClick={() => setOpen(false)}
                className="block rounded-md py-3"
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
