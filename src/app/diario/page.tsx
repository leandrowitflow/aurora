import type { Metadata } from "next";
import Link from "next/link";
import { DiarioCard, DiarioCardFromPost } from "@/components/DiarioCard";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";
import { PullQuote } from "@/components/PullQuote";
import { SectionHeading } from "@/components/SectionHeading";
import { isCmsConfigured } from "@/lib/cms/config";
import { getPublishedPosts } from "@/lib/cms/posts";

export const metadata: Metadata = {
  title: "Diário do Aurora | Coletivo Aurora",
  description:
    "Documentação da vida comunitária no Coletivo Aurora: histórias, aprendizagens e instantes do dia a dia.",
};

const PLACEHOLDER_POSTS = [
  {
    slug: "o-primeiro-rolar-no-chao",
    title: "O primeiro rolar no chão",
    date: "Em breve",
    imageSrc: "/images/diario-primeiro-rolar.webp",
  },
  {
    slug: "a-receita-que-os-seniores-nos-ensinaram",
    title: "A receita que os seniores nos ensinaram",
    date: "Em breve",
    imageSrc: "/images/diario-receita-seniores.webp",
  },
  {
    slug: "barro-cru-maos-livres",
    title: "Barro cru, mãos livres",
    date: "Em breve",
    imageSrc: "/images/diario-barro-maos.webp",
  },
];

export default async function DiarioPage() {
  const cmsReady = isCmsConfigured();
  const { posts } = cmsReady ? await getPublishedPosts() : { posts: [] };
  const hasCmsPosts = posts.length > 0;

  return (
    <PageShell>
      <PageHero
        title="Diário do Aurora"
        subtitle="A vida que acontece no Coletivo, documentada com cuidado, escuta e presença."
        imageSrc="/images/hero-diario.webp"
      />

      <PageSection>
        <SectionHeading eyebrow="O registo" title="Histórias do dia a dia" />
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
            Guardamos os instantes sagrados: um primeiro rolar no chão, um
            objeto natural explorado com total concentração, um olhar de
            profundo encontro entre um pai e o seu filho.
          </PullQuote>
        </div>
      </PageSection>

      <PageSection className="pt-0 lg:pt-0">
        <SectionHeading eyebrow="Histórias" title="Últimas publicações" />
        <div className="diario-grid mt-10">
          {hasCmsPosts
            ? posts.map((post) => (
                <DiarioCardFromPost
                  key={post.id}
                  slug={post.slug}
                  title={post.title}
                  publishedAt={post.publishedAt}
                  coverImageUrl={post.coverImageUrl}
                />
              ))
            : PLACEHOLDER_POSTS.map((post) => (
                <DiarioCard key={post.slug} {...post} />
              ))}
        </div>

        {cmsReady && !hasCmsPosts ? (
          <p className="body-text mt-10 text-center text-olive/70">
            Ainda não há publicações. As histórias aparecerão aqui assim que forem
            publicadas no CMS.
          </p>
        ) : null}
      </PageSection>
    </PageShell>
  );
}
