import type { Metadata } from "next";
import { DecoratedPage } from "@/components/DecoratedPage";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";
import { PullQuote } from "@/components/PullQuote";
import { SectionFigure } from "@/components/SectionFigure";
import { SectionHeading } from "@/components/SectionHeading";
import { ShapeGap } from "@/components/PageDecorations";

export const metadata: Metadata = {
  title: "Quem somos | Coletivo Aurora",
  description:
    "A história, a equipa e os valores do Coletivo Aurora em Olhão.",
};

const ETHICS = [
  {
    title: "Cuidar da terra",
    text: "Respeitamos os ritmos orgânicos e os ciclos da natureza em tudo o que cultivamos.",
  },
  {
    title: "Cuidar das pessoas",
    text: "Cada indivíduo é cidadão de pleno direito, com tempo, escuta e presença.",
  },
  {
    title: "Partilhar a abundância",
    text: "Da horta à mesa, do gesto ao encontro, a comunidade vive o excedente em conjunto.",
  },
];

export default function QuemSomosPage() {
  return (
    <PageShell>
      <DecoratedPage>
        <PageHero
          title="Quem somos"
          subtitle="Um lugar do mundo onde diferentes saberes, idades e histórias partilham o mesmo chão."
          imageSrc="/images/hero-quem-somos.webp"
        />

        <ShapeGap preset="loopLeft" />

        <PageSection>
          <SectionHeading
            eyebrow="A nossa história"
            title="De jardim de infância a casa de encontro"
          />
          <div className="mt-6 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              <p className="body-text">
                O Coletivo Aurora nasceu em 2022 como um jardim de infância inspirado
                na pedagogia Waldorf. Em 2025, encontrou morada num antigo edifício
                escolar em Olhão, e floresceu como um lugar aberto a todas as idades.
              </p>
              <div className="intro-quote-panel">
                <PullQuote>
                  Cada pessoa traz consigo cem linguagens para se expressar, cem formas
                  de manifestar a sua visão e cem histórias fundamentais para contar.
                </PullQuote>
              </div>
            </div>
            <SectionFigure
              src="/images/section-quem-somos.webp"
              imageShapeOverlay="terracotta-wave-top"
            />
          </div>
        </PageSection>

        <ShapeGap preset="dotsRight" />

        <PageSection className="pt-0 lg:pt-0">
          <SectionHeading eyebrow="A equipa" title="Saberes que se cruzam" />
          <p className="body-text mt-6 max-w-[960px]">
            Cruzamos design, permacultura, educação de infância, educação social e
            animação sociocultural. Inspiramo-nos nos ritmos orgânicos, nas cem
            linguagens e na permacultura, e abrimo-nos a todos os públicos, no
            mesmo chão.
          </p>
          <div className="ethic-flow mt-12">
            {ETHICS.map((ethic) => (
              <div key={ethic.title} className="ethic-item">
                <h3 className="heading-subsection">{ethic.title}</h3>
                <p className="body-text mt-3">{ethic.text}</p>
              </div>
            ))}
          </div>
        </PageSection>
      </DecoratedPage>
    </PageShell>
  );
}
