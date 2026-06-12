import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Espaço Transparência | Coletivo Aurora",
  description:
    "Documentos legais, relatórios de atividades e políticas do Coletivo Aurora.",
};

const DOCUMENTS = [
  {
    label: "Estatutos e Documentos Legais",
    type: "PDF",
    href: "#",
  },
  {
    label: "Relatório Anual de Atividades",
    type: "PDF",
    href: "#",
  },
];

const POLICIES = [
  { label: "Política de Privacidade", href: "#" },
  { label: "Termos e Condições", href: "#" },
];

export default function TransparenciaPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Institucional"
        title="Espaço Transparência"
        subtitle="Documentação institucional e informação legal do Coletivo Aurora."
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
