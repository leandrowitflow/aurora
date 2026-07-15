import Image from "next/image";
import Link from "next/link";
import { PartnersLogos } from "@/components/PartnersBar";
import { NAV_LINKS } from "@/lib/nav-links";

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/coletivoaurora.algarve/",
    icon: "/images/social-facebook.svg",
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/coletivoaurora_algarve/",
    icon: "/images/social-instagram.svg",
    label: "Instagram",
  },
  {
    href: "https://chat.whatsapp.com/FWHiBG8wt9UEq7CQACniRF",
    icon: "/images/social-whatsapp.svg",
    label: "WhatsApp",
  },
];

export function Footer() {
  return (
    <footer className="site-footer bg-olive text-white">
      <div className="site-container py-16">
        <nav className="flex flex-wrap gap-x-10 gap-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              className="font-[family-name:var(--font-manrope)] text-lg font-bold text-white transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="footer-brand flex min-w-0 flex-col items-start gap-6">
            <Link
              href="/"
              prefetch={false}
              className="footer-brand__logo inline-block transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/footer-logo.png"
                alt="Coletivo Aurora"
                width={2335}
                height={1006}
                sizes="(max-width: 640px) 120px, 140px"
                loading="lazy"
                className="h-auto w-full object-left"
              />
            </Link>
            <PartnersLogos className="footer-brand__partners w-full" />
          </div>

          <div className="lg:text-right">
            <h3 className="font-[family-name:var(--font-manrope)] text-[21px] font-medium tracking-tight">
              Entre em contacto
            </h3>
            <address className="mt-6 space-y-4 not-italic font-[family-name:var(--font-manrope)] text-sm leading-[28px] text-[rgba(255,255,255,0.63)]">
              <p>Sítio do Pereiro nº 400F, Moncarapacho, 8700-073 Olhão</p>
              <p>
                <a href="mailto:somosaurora@gmail.com" className="hover:text-white">
                  somosaurora@gmail.com
                </a>
              </p>
            </address>
            <div className="mt-8 flex gap-3 lg:justify-end">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-opacity hover:opacity-70"
                >
                  <Image src={social.icon} alt="" width={20} height={20} aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm font-[family-name:var(--font-manrope)] sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © FlowProductions 2026</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/contactos" prefetch={false} className="hover:opacity-70">Contactos</Link>
            <Link href="/transparencia" prefetch={false} className="hover:opacity-70">Transparência</Link>
            <Link href="/transparencia" prefetch={false} className="hover:opacity-70">Política de privacidade</Link>
            <Link href="/transparencia" prefetch={false} className="hover:opacity-70">Termos e condições</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
