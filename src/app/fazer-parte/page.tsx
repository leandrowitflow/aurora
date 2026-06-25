import type { Metadata } from "next";
import { DecoratedPage } from "@/components/DecoratedPage";
import { FazerParteContent } from "@/components/FazerParteContent";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Fazer parte | Coletivo Aurora",
  description:
    "Voluntariado, donativos, amigos do Aurora e parcerias para sustentar o projeto.",
};

export default function FazerPartePage() {
  return (
    <PageShell>
      <DecoratedPage>
        <PageHero
          title="Fazer parte"
          subtitle="Cada gesto, grande ou pequeno, ajuda a manter vivo o Tecendo gerações e toda a comunidade que o sustenta."
          imageSrc="/images/hero-fazer-parte.webp"
        />

        <PageSection tone="cream">
          <FazerParteContent />
        </PageSection>
      </DecoratedPage>
    </PageShell>
  );
}
