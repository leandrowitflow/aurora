import type { ReactNode } from "react";

export function DecoratedPage({ children }: { children: ReactNode }) {
  return <div className="decorated-page">{children}</div>;
}
