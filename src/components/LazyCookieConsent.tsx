"use client";

import dynamic from "next/dynamic";

const CookieConsent = dynamic(
  () => import("@/components/CookieConsent").then((module) => module.CookieConsent),
  { ssr: false },
);

export function LazyCookieConsent() {
  return <CookieConsent />;
}
