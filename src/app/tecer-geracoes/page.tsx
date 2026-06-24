import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";
import { PillarLink } from "@/components/PillarLink";
import { PullQuote } from "@/components/PullQuote";
import { SectionHeading } from "@/components/SectionHeading";
import { TopicTagList } from "@/components/TopicTagList";

export const metadata: Metadata = {
  title: "Tecendo gerações | Coletivo Aurora",
  description:
    "Projeto social gratuito que une gerações através da horta, da cozinha comunitária e do encontro.",
};

const ACTIVITIES = [
  {
    title: "Horta de permacultura",
    description: "Semear, cuidar e colher com respeito pelos ritmos da terra.",
  },
  {
    title: "Ateliês expressivos",
    description: "Criar com as mãos, cores e materiais que convidam à expressão.",
  },
  {
    title: "Jogos tradicionais",
    description: "Partilhar risos e memórias através do brincar em comunidade.",
  },
  {
    title: "Dança e movimento",
    description: "O corpo em encontro: ritmo, presença e alegria partilhada.",
  },
  {
    title: "Histórias à lareira",
    description: "Memórias, escuta e o calor de narrar em roda.",
  },
  {
    title: "Cozinha comunitária",
    description: "Sabores, receitas e raízes que atravessam gerações.",
  },
];

const SUPPORT_LINKS = [
  { label: "Inscrição e Calendarização", href: "/inscricoes#inscricao-projeto" },
  { label: "Quero ser voluntário", href: "/fazer-parte#voluntariado" },
  { label: "Fazer um donativo", href: "/fazer-parte#donativos" },
  { label: "Tornar-me amigo do Aurora", href: "/fazer-parte#amigos" },
  { label: "Criar uma parceria", href: "/fazer-parte#parcerias" },
];

export default function TecerGeracoesPage() {
  return (
    <PageShell>
      <PageHero
        title="Tecendo gerações"
        subtitle="O coração pulsante do Coletivo Aurora, gratuito, comunitário e aberto a quem a sociedade muitas vezes mantém separado."
        imageSrc="/images/hero-tecer-geracoes.webp"
      />

      <PageSection>
        <SectionHeading
          eyebrow="O projeto"
          title="Um encontro gratuito entre gerações"
        />
        <div className="mt-6 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <div className="body-text space-y-6">
              <p>
                O Tecendo gerações é o coração pulsante do Coletivo Aurora. Trata-se
                de um projeto de base comunitária, inteiramente gratuito para os
                seus participantes, que visa combater o isolamento e promover a
                inclusão.
              </p>
              <p>
                Todas as semanas, juntamos pessoas que a sociedade muitas vezes
                mantém separadas: crianças e idosos, jovens com deficiência e a
                comunidade migrante. Juntos, partilhamos o mesmo chão.
              </p>
            </div>
            <div className="intro-quote-panel">
              <PullQuote>
                Juntos, partilhamos o mesmo chão através da horta, dos ateliês, da
                cozinha comunitária e das histórias que tecem uma comunidade mais
                justa.
              </PullQuote>
            </div>
          </div>
          <figure className="section-figure">
            <Image
              src="/images/section-tecer-geracoes.webp"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </figure>
        </div>
      </PageSection>

      <PageSection tone="pattern">
        <TopicTagList items={ACTIVITIES} label="O que fazemos juntos" />
      </PageSection>

      <PageSection>
        <div className="schedule-panel">
          <div className="schedule-panel-main">
            <SectionHeading
              eyebrow="Agenda"
              title="Calendário semanal"
              description="Consulte as atividades desta semana, em breve com calendário interativo."
            />
          </div>
          <aside className="schedule-panel-aside">
            <p className="schedule-panel-badge">Em breve</p>
            <p className="body-text mt-5">
              O calendário estará disponível em breve. Entretanto, contacte-nos
              para saber mais sobre as atividades desta semana.
            </p>
            <div className="mt-8">
              <Button href="/contactos" label="Contactar" />
            </div>
          </aside>
        </div>
      </PageSection>

      <PageSection id="participar" className="pt-0 lg:pt-0">
        <SectionHeading
          eyebrow="Envolvimento"
          title="Como participar ou apoiar?"
          description="O Tecendo gerações é gratuito para os seus públicos prioritários. Quer se queira inscrever, quer pretenda apoiar a sustentabilidade deste projeto, há um lugar para si na nossa comunidade."
        />
        <div className="mt-10 space-y-3">
          {SUPPORT_LINKS.map((link) => (
            <PillarLink
              key={link.href}
              label={link.label}
              href={link.href}
            />
          ))}
        </div>
      </PageSection>
    </PageShell>
  );
}
