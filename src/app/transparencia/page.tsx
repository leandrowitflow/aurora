import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Espaço transparência | Coletivo Aurora",
  description:
    "Documentos legais, relatórios de atividades e políticas do Coletivo Aurora.",
};

const DOCUMENTS = [
  {
    label: "Estatutos e documentos legais",
    type: "PDF",
    href: "#",
  },
  {
    label: "Relatório anual de atividades",
    type: "PDF",
    href: "#",
  },
];

const POLICIES = [
  { label: "Política de privacidade", href: "#" },
  { label: "Termos e condições", href: "#" },
];

export default function TransparenciaPage() {
  return (
    <PageShell>
      <PageHero
        title="Espaço transparência"
        subtitle="Documentação institucional e informação legal do Coletivo Aurora."
        imageSrc="/images/hero-transparencia.png"
      />

      <PageSection narrow>
        <SectionHeading
          eyebrow="Documentos"
          title="Arquivo institucional"
          description="Consulte os documentos oficiais do Coletivo Aurora."
        />

        <ul className="mt-10 list-none p-0">
          {DOCUMENTS.map((doc) => (
            <li key={doc.label}>
              <Link href={doc.href} className="doc-link">
                <span>{doc.label}</span>
                <span className="label-olive text-sm">{doc.type}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="organic-divider mt-16" />

        <div className="mt-12">
          <SectionHeading eyebrow="Legal" title="Políticas" />
          <div className="body-text mt-8 flex flex-col gap-4 sm:flex-row sm:gap-10">
            {POLICIES.map((policy) => (
              <Link
                key={policy.label}
                href={policy.href}
                className="font-bold text-olive underline transition-opacity hover:opacity-70"
              >
                {policy.label}
              </Link>
            ))}
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
}
