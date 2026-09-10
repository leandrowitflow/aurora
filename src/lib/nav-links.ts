import { SHOW_PUBLIC_CALENDAR } from "@/lib/feature-flags";

const ALL_NAV_LINKS = [
  { label: "Quem somos", href: "/quem-somos" },
  { label: "Viver o coletivo", href: "/viver-o-coletivo" },
  { label: "Tecer gerações", href: "/tecer-geracoes" },
  { label: "Calendário", href: "/calendario" },
  { label: "Fazer parte", href: "/fazer-parte" },
  { label: "Diário", href: "/diario" },
] as const;

export const NAV_LINKS = SHOW_PUBLIC_CALENDAR
  ? ALL_NAV_LINKS
  : ALL_NAV_LINKS.filter((link) => link.href !== "/calendario");
