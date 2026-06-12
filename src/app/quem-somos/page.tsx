import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";
import { PullQuote } from "@/components/PullQuote";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Quem Somos | Coletivo Aurora",
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
    text: "Cada indivíduo é cidadão de pleno direito — com tempo, escuta e presença.",
  },
  {
    title: "Partilhar a abundância",
    text: "Da horta à mesa, do gesto ao encontro, a comunidade vive o excedente em conjunto.",
  },
];

export default function QuemSomosPage() {
  return (
    <PageShell>
      <PageHero
        title="Quem Somos"
        subtitle="Um lugar do mundo onde diferentes saberes, idades e histórias partilham o mesmo chão."
        imageSrc="/images/hero-quem-somos.png"
      />

      <PageSection>
        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="body-text space-y-6">
            <p>
              O que hoje conhecemos como Coletivo Aurora começou a ganhar vida em
              2022, como um projeto de jardim de infância inspirado na pedagogia
              Waldorf. Durante três anos, plantámos sementes profundas — de
              amizade, de trabalho comunitário, de amor aos materiais naturais e
              de respeito pelos ritmos da terra.
            </p>
            <p>
              Em 2025, esse sonho encontrou a sua morada definitiva: um antigo
              edifício escolar em Olhão, repleto de memórias de outras gerações.
              Foi nesse espaço de partilha que o projeto se transformou,
              floresceu e assumiu a identidade que carrega hoje.
            </p>
          </div>
          <PullQuote>
            Cada pessoa traz consigo cem linguagens para se expressar, cem formas
            de manifestar a sua visão e cem histórias fundamentais para contar.
          </PullQuote>
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading
          eyebrow="A equipa"
          title="Saberes que se cruzam"
          description="Designer, permacultor, educadora de infância, educadora social e animadora sociocultural — juntos, criámos um lugar que se nutre de diferentes abordagens."
        />
        <div className="body-text mt-10 max-w-[900px] space-y-6">
          <p>
            Na nossa equipa cruzamos os saberes de uma designer, de um
            permacultor, de uma educadora de infância, de uma educadora social e
            de uma animadora sociocultural. Juntos, decidimos criar um lugar que
            se nutre de diferentes abordagens pedagógicas e sociais, deixando
            espaço para evoluir e acolher novas visões.
          </p>
          <p>
            A nossa prática diária continua a ser inspirada pelo respeito aos
            ritmos orgânicos, pelos rituais e pela ligação íntima com os ciclos
            do ano. Ao mesmo tempo, cruzamos caminhos com visões que valorizam
            cada indivíduo como cidadão de pleno direito desde o nascimento,
            trazendo para o espaço o manifesto das cem linguagens, a
            intencionalidade estética, o movimento livre e o respeito absoluto
            pelo tempo de cada infância.
          </p>
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading
          eyebrow="Permacultura"
          title="As três éticas que nos guiam"
        />
        <div className="ethic-flow mt-10">
          {ETHICS.map((ethic) => (
            <div key={ethic.title} className="ethic-item">
              <h3 className="heading-subsection">{ethic.title}</h3>
              <p className="body-text mt-3">{ethic.text}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <div className="body-text max-w-[900px] space-y-6">
          <p>
            Desta fusão de saberes, o Aurora estendeu os seus braços e abriu-se
            a todos os públicos — deixando de ser um espaço exclusivo para
            crianças para se tornar num lugar do mundo.
          </p>
          <p>
            No Coletivo Aurora, juntamos todas estas vivências no mesmo chão,
            celebrando a diversidade humana e crescendo juntos com a natureza.
          </p>
        </div>
      </PageSection>
    </PageShell>
  );
}
