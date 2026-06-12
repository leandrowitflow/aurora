import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { ComingSoonPanel } from "@/components/ComingSoonPanel";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";
import { PillarLink } from "@/components/PillarLink";
import { PullQuote } from "@/components/PullQuote";
import { SectionHeading } from "@/components/SectionHeading";
import { TopicTagList } from "@/components/TopicTagList";

export const metadata: Metadata = {
  title: "Tecendo Gerações | Coletivo Aurora",
  description:
    "Projeto social gratuito que une gerações através da horta, da cozinha comunitária e do encontro.",
};

const ACTIVITIES = [
  "Horta de permacultura",
  "Ateliês expressivos",
  "Jogos tradicionais",
  "Dança e movimento",
  "Histórias à lareira",
  "Cozinha comunitária",
];

const SUPPORT_LINKS = [
  { label: "Inscrição no Projeto", href: "/inscricoes#inscricao-projeto" },
  { label: "Quero Ser Voluntário", href: "/fazer-parte#voluntariado" },
  { label: "Fazer um Donativo", href: "/fazer-parte#donativos" },
  { label: "Tornar-me Amigo do Aurora", href: "/fazer-parte#amigos" },
  { label: "Criar uma Parceria", href: "/fazer-parte#parcerias" },
];

export default function TecerGeracoesPage() {
  return (
    <PageShell>
      <PageHero
        title="Tecendo Gerações"
        subtitle="O coração pulsante do Coletivo Aurora — gratuito, comunitário e aberto a quem a sociedade muitas vezes mantém separado."
        imageSrc="/images/hero-tecer-geracoes.png"
      />

      <PageSection>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="body-text space-y-6">
            <p>
              O Tecendo Gerações é o coração pulsante do Coletivo Aurora. Trata-se
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
          <PullQuote>
            Juntos, partilhamos o mesmo chão através da horta, dos ateliês, da
            cozinha comunitária e das histórias que tecem uma comunidade mais
            justa.
          </PullQuote>
        </div>

        <div className="mt-14">
          <TopicTagList items={ACTIVITIES} label="O que fazemos juntos" />
        </div>
      </PageSection>

      <PageSection>
        <SectionHeading
          eyebrow="Agenda"
          title="Calendário semanal"
          description="Consulte as atividades desta semana — em breve com calendário interativo."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <ComingSoonPanel
            label="Calendário"
            title="Programação semanal"
            description="O calendário estará disponível em breve. Entretanto, contacte-nos para saber mais sobre as atividades desta semana."
          />
          <Button href="/contactos" label="Contactar" />
        </div>
      </PageSection>

      <PageSection id="participar">
        <SectionHeading
          eyebrow="Envolvimento"
          title="Como participar ou apoiar?"
          description="O Tecendo Gerações é gratuito para os seus públicos prioritários. Quer se queira inscrever, quer pretenda apoiar a sustentabilidade deste projeto, há um lugar para si na nossa comunidade."
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
