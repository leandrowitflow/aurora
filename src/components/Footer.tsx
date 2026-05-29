import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav-links";

const SOCIAL_LINKS = [
  { href: "#", icon: "/images/social-x.svg", label: "X" },
  {
    href: "https://www.facebook.com/jardimauroraalgarve?locale=pt_PT",
    icon: "/images/social-facebook.svg",
    label: "Facebook",
  },
  { href: "#", icon: "/images/social-linkedin.svg", label: "LinkedIn" },
  {
    href: "https://www.instagram.com/coletivoaurora_algarve/",
    icon: "/images/social-instagram.svg",
    label: "Instagram",
  },
];

export function Footer() {
  return (
    <footer className="bg-olive text-white">
      <div className="mx-auto max-w-[1920px] px-page py-16">
        <nav className="flex flex-wrap gap-x-10 gap-y-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-manrope)] text-xl font-bold text-white transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-[family-name:var(--font-roboto)] text-[32px] font-medium leading-tight">
              Não Perca Nenhuma Oportunidade.
            </h3>
            <p className="mt-3 font-[family-name:var(--font-roboto)] text-lg font-light">
              Subscreve a nossa Newsletter
            </p>
            <form className="mt-6 flex max-w-[360px] items-center gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="h-12 flex-1 rounded-full bg-white px-5 font-[family-name:var(--font-roboto)] text-sm text-[#1c2544] outline-none"
              />
              <button
                type="submit"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white transition-opacity hover:opacity-80"
                aria-label="Subscrever newsletter"
              >
                <Image src="/images/icon-arrow-submit.svg" alt="" width={24} height={24} aria-hidden />
              </button>
            </form>
          </div>

          <div className="lg:text-right">
            <h3 className="font-[family-name:var(--font-roboto)] text-[21px] font-medium tracking-tight">
              Entre em contato
            </h3>
            <address className="mt-6 space-y-4 not-italic font-[family-name:var(--font-poppins)] text-base leading-[30px] text-[rgba(255,255,255,0.63)]">
              <p>Sítio do Pereiro nº 400F, Moncarapacho, 8700-073 Olhão</p>
              <p>
                <a href="mailto:somosaurora@gmail.com" className="hover:text-white">
                  somosaurora@gmail.com
                </a>
              </p>
              <p>
                <a href="https://wa.me/351918221881" className="hover:text-white">
                  +351 918 221 881
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

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-base font-[family-name:var(--font-roboto)] sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © FlowProduction 2026</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:opacity-70">Privacy Policy</Link>
            <Link href="#" className="hover:opacity-70">Terms of Service</Link>
            <Link href="#" className="hover:opacity-70">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
