import type { ReactNode } from "react";

interface ComingSoonPanelProps {
  label: string;
  title: string;
  description?: ReactNode;
}

export function ComingSoonPanel({ label, title, description }: ComingSoonPanelProps) {
  return (
    <div className="coming-soon-note">
      <p className="label-olive">{label}</p>
      <h3 className="heading-subsection mt-4">{title}</h3>
      {description ? <p className="body-text mt-3">{description}</p> : null}
      <p className="body-text mt-5 text-olive/60">Disponível em breve</p>
    </div>
  );
}
