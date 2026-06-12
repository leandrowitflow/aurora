"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({ href, label, className = "", onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = isActivePath(pathname, href);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`font-[family-name:var(--font-manrope)] text-xl font-bold text-olive transition-opacity hover:opacity-70 ${
        isActive ? "underline decoration-2 underline-offset-[10px]" : ""
      } ${className}`}
    >
      {label}
    </Link>
  );
}
