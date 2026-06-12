import Image from "next/image";
import Link from "next/link";

type ButtonVariant = "olive" | "mustard";

interface ButtonProps {
  href: string;
  label: string;
  variant?: ButtonVariant;
}

export function Button({ href, label, variant = "olive" }: ButtonProps) {
  const isMustard = variant === "mustard";

  return (
    <Link
      href={href}
      className={`group inline-flex h-[63px] items-center gap-3 border-2 px-8 font-[family-name:var(--font-manrope)] text-[20px] font-bold leading-normal transition-colors ${
        isMustard
          ? "border-mustard text-mustard hover:bg-mustard/10"
          : "border-olive text-olive hover:bg-olive/5"
      }`}
    >
      <span>{label}</span>
      <Image
        src={isMustard ? "/images/icon-arrow-mustard.svg" : "/images/icon-arrow-olive.svg"}
        alt=""
        width={24}
        height={24}
        aria-hidden
        className="transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}
