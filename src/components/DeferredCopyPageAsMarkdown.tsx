"use client";

import dynamic from "next/dynamic";

const CopyPageAsMarkdown = dynamic(() => import("@/components/CopyPageAsMarkdown"), {
  ssr: false,
});

export function DeferredCopyPageAsMarkdown() {
  return <CopyPageAsMarkdown />;
}
