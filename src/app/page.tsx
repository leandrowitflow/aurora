import { HomeBannerCarousel } from "@/components/HomeBannerCarousel";
import {
  HOME_SHAPES,
  SectionShapeGap,
} from "@/components/HomeDecorations";
import { ContentSection } from "@/components/ContentSection";
import { PageShell } from "@/components/PageShell";

export default function Home() {
  return (
    <PageShell>
      <div className="home-page">
        <HomeBannerCarousel />

        <section className="py-12 lg:py-14 xl:py-16 2xl:py-20">
          <div className="site-container text-center">
            <h2 className="heading-section">O que nos move</h2>
            <p className="body-text mx-auto mt-6">
              Inspirados pelo respeito aos ritmos orgânicos, pelo manifesto das cem
              linguagens e pelos princípios da permacultura, cultivamos um lugar de
              encontro onde as pessoas se juntam para pôr as mãos na terra, criar
              livremente e partilhar a vida comunitária. Acreditamos que a beleza do
              espaço, a escuta atenta e a liberdade de explorar os materiais com as
              próprias mãos são puros atos de cuidado mútuo.
              <br />
              <br />
              Aqui, diferentes idades, origens e contextos de vida partilham o mesmo
              chão, aprendendo uns com os outros e resgatando o sentido profundo de
              viver em comunidade.
            </p>
          </div>
        </section>

        <SectionShapeGap
          src={HOME_SHAPES.oliveLoop}
          sizes="(min-width: 1280px) 266px, 200px"
          align="left"
          kind="loop"
        />

        <ContentSection
          title="Viver o coletivo"
          description={
            <>
              Ateliers criativos para bebés, crianças, famílias e adultos.
              <br />
              Semanas de férias na horta e celebrações inesquecíveis, construídas pelas mãos das crianças onde a natureza é a melhor sala de aula.
            </>
          }
          imageSrc="/images/section-viver-coletivo.webp"
          imageAlt="Famílias e crianças num atelier criativo ao ar livre com materiais naturais"
          imageLayout="viver"
          buttonLabel="Explorar atividades"
          buttonHref="/viver-o-coletivo"
          imagePosition="right"
        />

        <SectionShapeGap
          src={HOME_SHAPES.peachDots}
          sizes="(min-width: 1280px) 256px, 180px"
          align="right"
          kind="dots"
        />

        <ContentSection
          id="tecer-geracoes"
          title="Tecendo gerações"
          description={
            <>
              Todas as semanas, juntamos pessoas de diferentes gerações e percursos que a sociedade muitas vezes mantém separadas.
              <br />
              Cozinhamos, pintamos, plantamos, partilhamos histórias e tecemos uma comunidade mais justa e acolhedora.
            </>
          }
          imageSrc="/images/section-tecendo.webp"
          imageAlt="Pessoas de diferentes gerações a cozinhar, pintar e plantar juntas"
          imageLayout="tecendo"
          buttonLabel="Conhecer o projeto"
          buttonHref="/tecer-geracoes"
          imagePosition="left"
          imageShapeOverlay="terracotta-wave-top"
        />

        <ContentSection
          id="apoiar"
          title="Como apoiar?"
          description="O Tecendo gerações só é possível com o apoio da nossa rede de solidariedade. Seja através de voluntariado, de um donativo pontual ou tornando-se um parceiro do projeto, há um lugar para si no Aurora."
          imageSrc="/images/prima2.jpeg"
          imageAlt="Antigo edifício da Escola Primária em Olhão, sede do Coletivo Aurora"
          imageLayout="apoiar"
          buttonLabel="Apoiar o Aurora"
          buttonHref="/fazer-parte"
          imagePosition="right"
          imageShapeOverlay="olive-wave-bottom"
        />
      </div>
    </PageShell>
  );
}
