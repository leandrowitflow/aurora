import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ContentSection } from "@/components/ContentSection";
import { PartnersBar } from "@/components/PartnersBar";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        <ContentSection
          id="viver-o-coletivo"
          title="Onde a natureza e o brincar livre guiam a descoberta de cada dia."
          description="Aqui, cada passo pequeno abre caminho a uma nova descoberta. Com os pés na terra e as mãos livres, aprendemos ao ritmo da natureza."
          imageSrc="/images/section-nature.png"
          imageAlt="Criança a regar plantas na horta"
          imageLayout="nature"
          buttonLabel="Ver Atividades"
          buttonHref="#atividades"
          imagePosition="left"
        />

        <ContentSection
          id="quem-somos"
          title={
            <>
              Cuidar da terra, cuidar
              <br />
              das pessoas e partilhar.
            </>
          }
          description={
            <>
              Acreditamos num ciclo que se renova todos os dias:
              <br />
              Da horta à mesa, do gesto ao encontro, para que a abundância seja vivida em comunidade.
            </>
          }
          imageSrc="/images/section-cuidar-terra.png"
          imageAlt="Cesto de legumes frescos da horta"
          imageLayout="cuidar"
          buttonLabel="Apoiar o Projeto"
          buttonHref="#apoiar"
          imagePosition="right"
        />

        <ContentSection
          id="corpo"
          title="Um lugar para regressar ao corpo e abrandar o ritmo do dia."
          description="Entre texturas, gestos calmos e tempo para sentir, cada descoberta convida o corpo a estar presente e a infância a seguir o seu próprio compasso."
          imageSrc="/images/section-corpo.png"
          imageAlt="Criança a tecer uma cesta"
          imageLayout="corpo"
          buttonLabel="Ver Atividades"
          buttonHref="#atividades"
          imagePosition="left"
        />

        <section className="py-12 lg:py-14 xl:py-16 2xl:py-20">
          <div className="mx-auto max-w-[1264px] px-page text-center">
            <h2 className="heading-section">O que nos move</h2>
            <p className="body-text mx-auto mt-6">
              Guiados pelos ritmos orgânicos, pelas cem linguagens e pela permacultura, criámos um ponto de encontro comunitário para criar e trabalhar a terra livremente. Valorizamos a estética, a escuta e o manuseamento de materiais como formas de cuidado. Aqui, pessoas de todas as idades e contextos partilham vivências, aprendem em conjunto e resgatam o sentido profundo de comunidade.
            </p>
          </div>
        </section>

        <ContentSection
          title="Viver o Coletivo"
          description={
            <>
              Ateliers criativos para bebés, crianças, famílias e adultos.
              <br />
              Semanas de férias na horta e celebrações inesquecíveis, construídas pelas mãos das crianças onde a natureza é a melhor sala de aula.
            </>
          }
          imageSrc="/images/section-viver-coletivo.png"
          imageAlt="Criança a brincar na natureza"
          imageLayout="viver"
          buttonLabel="Ver Atividades"
          buttonHref="#atividades"
          imagePosition="right"
        />

        <ContentSection
          id="tecendo-geracoes"
          title="Tecendo Gerações"
          description={
            <>
              Todas as semanas, juntamos pessoas de diferentes gerações e percursos que a sociedade muitas vezes mantém separadas.
              <br />
              Cozinhamos, pintamos, plantamos, partilhamos histórias e tecemos uma comunidade mais justa e acolhedora.
            </>
          }
          imageSrc="/images/section-tecendo.png"
          imageAlt="Mulher idosa e criança a cozinhar juntas"
          imageLayout="tecendo"
          buttonLabel="Saber Mais"
          buttonHref="#tecendo-geracoes"
          imagePosition="left"
        />

        <ContentSection
          id="apoiar"
          title="Como Apoiar?"
          description="O Tecendo Gerações só é possível com o apoio da nossa rede de solidariedade. Seja através de voluntariado, de um donativo pontual ou tornando-se um parceiro do projeto — há um lugar para si no Aurora."
          imageSrc="/images/section-apoiar.png"
          imageAlt="Casa de pedra rústica do projeto Aurora"
          imageLayout="apoiar"
          buttonLabel="Apoiar o Projeto"
          buttonHref="#apoiar"
          imagePosition="right"
        />

        <PartnersBar />
      </main>
      <Footer />
    </>
  );
}
