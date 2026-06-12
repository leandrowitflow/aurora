import Image from "next/image";
import Link from "next/link";

interface PillarLinkProps {
  label: string;
  href: string;
}

export function PillarLink({ label, href }: PillarLinkProps) {
  return (
    <Link href={href} className="pillar-link group">
      <span className="pillar-link-marker" aria-hidden />
      <span className="pillar-link-label">{label}</span>
      <Image
        src="/images/icon-arrow-olive.svg"
        alt=""
        width={20}
        height={20}
        aria-hidden
        className="ml-auto shrink-0 opacity-50 transition-all group-hover:translate-x-1 group-hover:opacity-100"
      />
    </Link>
  );
}
