import type { Metadata } from "next";
import { ActivityBlock } from "@/components/ActivityBlock";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Viver o coletivo | Coletivo Aurora",
  description:
    "Ateliers, playgroups, horta comunitária, festas e férias para todas as idades no Coletivo Aurora.",
};

const ACTIVITIES = [
  {
    id: "playgroups",
    index: 1,
    tag: "0–2 anos",
    title: "Playgroups",
    imageSrc: "/images/activity-playgroups.png",
    description:
      "Um porto de abrigo para abrandar, observar e confiar no tempo de cada bebé. Inspirados pela abordagem Pikler, criamos um ambiente sereno onde os mais pequenos se movem livremente e exploram texturas seguras e naturais. Enquanto eles descobrem o mundo ao seu próprio ritmo, as mães e os pais ganham espaço para partilhar dúvidas, trocar experiências e respirar. Terminamos sempre aconchegados com uma roda de conversa e um chá.",
    buttonLabel: "Reservar vaga",
    buttonHref: "/inscricoes#ateliers",
  },
  {
    id: "ateliers-criancas",
    index: 2,
    tag: "3–10 anos",
    title: "Ateliers para crianças",
    imageSrc: "/images/activity-ateliers-criancas.png",
    description:
      "Não temos aulas, temos caminhos de descoberta. Exploramos o mundo através de tintas da natureza, argila, luz, sombra e tesouros da horta e do mar. Inspirados na abordagem Reggio Emilia, partimos de provocações que convidam a criar sem pressões. O adulto acompanha e documenta o percurso, permitindo que as crianças deem voz às suas cem linguagens.",
    buttonLabel: "Reservar vaga",
    buttonHref: "/inscricoes#ateliers",
  },
  {
    id: "ateliers-familias",
    index: 3,
    tag: "Famílias",
    title: "Ateliers para famílias",
    imageSrc: "/images/activity-ateliers-familias.png",
    description:
      "Um sábado por mês para deixar a rotina lá fora e criar em conjunto. Seja numa pintura de grandes dimensões ou a explorar a horta, a regra é só uma: todos fazem, todos sujam as mãos. Não há quem ensina nem quem aprende; o adulto volta a experimentar a liberdade de criar e a criança lidera o processo.",
    buttonLabel: "Reservar vaga",
    buttonHref: "/inscricoes#ateliers",
  },
  {
    id: "ateliers-adultos",
    index: 4,
    tag: "Adultos",
    title: "Ateliers para adultos",
    imageSrc: "/images/activity-ateliers-adultos.png",
    description:
      "Um convite para regressar às mãos, sentir o corpo e desacelerar da correria diária. Não precisa de ter qualquer experiência, apenas vontade de experimentar e explorar diferentes materiais. É um tempo dedicado a concentrar-se num só gesto e a experimentar a liberdade de criar sem regras.",
    buttonLabel: "Reservar vaga",
    buttonHref: "/inscricoes#ateliers",
  },
  {
    id: "horta",
    index: 5,
    tag: "Comunidade",
    title: "Horta comunitária e permacultura",
    imageSrc: "/images/activity-horta.png",
    description:
      "A nossa horta não é apenas um espaço de cultivo, é um lugar aberto à partilha de saberes e à experimentação prática. Organizamos dias de horta aberta onde vizinhos, amigos, voluntários e curiosos de todas as idades se juntam para semear com respeito e cuidar do espaço em conjunto.",
    note: "Valor: Participação livre / Contributo voluntário",
    buttonLabel: "Datas em breve",
    buttonHref: "/contactos",
  },
  {
    id: "festas",
    index: 6,
    tag: "Celebrações",
    title: "Festas para crianças",
    imageSrc: "/images/activity-festas.png",
    description:
      "Para celebrar a vida com os pés na terra e de forma ativa. Aqui, quem faz anos e os amigos partem à descoberta através de atividades artísticas, exploração na horta e brincadeiras ao ar livre. Nós preparamos o espaço com carinho e organizamos todos os materiais naturais.",
    buttonLabel: "Reservar vaga",
    buttonHref: "/inscricoes#aniversarios",
  },
  {
    id: "ferias",
    index: 7,
    tag: "Férias",
    title: "Férias no Aurora",
    imageSrc: "/images/activity-ferias.png",
    description:
      "Semanas passadas ao ar livre para explorar a horta, construir cabanas com ramos, cozinhar o que colhemos da terra e refrescar o calor com brincadeiras com água. Não há a obrigação de produzir um objeto final; saímos sempre com amizades novas e a certeza de que a natureza é a melhor sala de aula.",
    buttonLabel: "Reservar vaga",
    buttonHref: "/inscricoes#ferias",
  },
] as const;

export default function ViverOColetivoPage() {
  return (
    <PageShell>
      <PageHero
        title="Viver o coletivo"
        subtitle="Da infância à vida adulta — com a natureza como sala de aula e as mãos como ferramenta de descoberta."
        imageSrc="/images/hero-viver-o-coletivo.png"
      />

      <PageSection>
        <SectionHeading
          eyebrow="Porquê participar"
          title="Cada inscrição sustenta a comunidade"
          description="Participar nas nossas atividades é a forma mais significativa de sustentar o Coletivo e viabilizar o projeto social Tecendo gerações. Ao escolher um atelier para si ou para a sua família, ajuda a manter viva uma comunidade onde todas as pessoas têm um lugar de pertença."
        />
      </PageSection>

      <PageSection wide className="pt-0 lg:pt-0">
        <SectionHeading
          eyebrow="Programa"
          title="As nossas atividades"
        />
        <div className="mt-12">
          {ACTIVITIES.map((activity) => (
            <ActivityBlock key={activity.id} {...activity} />
          ))}
        </div>
      </PageSection>
    </PageShell>
  );
}
