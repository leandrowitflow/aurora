import type { Metadata } from "next";
import Link from "next/link";
import { DiarioCard } from "@/components/DiarioCard";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";
import { PullQuote } from "@/components/PullQuote";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Diário do Aurora | Coletivo Aurora",
  description:
    "Documentação da vida comunitária no Coletivo Aurora — histórias, aprendizagens e instantes do dia a dia.",
};

const PLACEHOLDER_POSTS = [
  {
    title: "O primeiro rolar no chão",
    excerpt:
      "Um instante sagrado dos nossos playgroups — um bebé a explorar texturas naturais com total concentração.",
    date: "Em breve",
  },
  {
    title: "A receita que os seniores nos ensinaram",
    excerpt:
      "Na cozinha comunitária, uma história antiga ganhou nova vida entre gerações.",
    date: "Em breve",
  },
  {
    title: "Barro cru, mãos livres",
    excerpt:
      "O barro que ganhou forma pelas mãos de quem nunca o tinha moldado — e as perguntas imprevistas das crianças.",
    date: "Em breve",
  },
];

export default function DiarioPage() {
  return (
    <PageShell>
      <PageHero
        title="Diário do Aurora"
        subtitle="A vida que acontece no Coletivo — documentada com cuidado, escuta e presença."
        imageSrc="/images/hero-diario.png"
      />

      <PageSection>
        <SectionHeading
          eyebrow="O registo"
          title="Histórias do dia a dia"
        />
        <div className="body-text mt-6 max-w-[960px] space-y-6">
          <p>
            Aqui documentamos a vida que acontece no Coletivo. As perguntas
            imprevistas que as crianças fizeram. A receita antiga que os
            seniores nos ensinaram na cozinha comunitária. A história de
            superação que um migrante partilhou à lareira.
          </p>
          <p>
            O barro cru que ganhou forma pelas mãos de quem nunca o tinha
            moldado. As nossas dificuldades, as aprendizagens e as pequenas
            grandes alegrias diárias.
          </p>
        </div>

        <div className="intro-quote-panel">
          <PullQuote>
            Guardamos os instantes sagrados — um primeiro rolar no chão, um
            objeto natural explorado com total concentração, um olhar de
            profundo encontro entre um pai e o seu filho.
          </PullQuote>
        </div>
      </PageSection>

      <PageSection className="pt-0 lg:pt-0">
        <SectionHeading eyebrow="Histórias" title="Últimas publicações" />
        <div className="mt-10 max-w-[800px]">
          {PLACEHOLDER_POSTS.map((post) => (
            <DiarioCard key={post.title} {...post} />
          ))}
        </div>
        <p className="body-text mt-12 max-w-[700px]">
          O blog estará disponível em breve. Entretanto, siga-nos no{" "}
          <Link
            href="https://www.instagram.com/coletivoaurora_algarve/"
            className="font-bold text-olive underline transition-opacity hover:opacity-70"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </Link>{" "}
          para acompanhar o dia a dia do Aurora.
        </p>
      </PageSection>
    </PageShell>
  );
}
