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
      prefetch={false}
      className={`group inline-flex h-[48px] items-center gap-2.5 border-2 px-6 font-[family-name:var(--font-manrope)] text-[15px] font-bold leading-none transition-colors xl:h-[52px] xl:px-7 xl:text-[17px] 2xl:h-[63px] 2xl:gap-3 2xl:px-8 2xl:text-[20px] ${
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
        loading="lazy"
        fetchPriority="low"
        className="h-5 w-5 transition-transform group-hover:translate-x-1 2xl:h-6 2xl:w-6"
      />
    </Link>
  );
}
