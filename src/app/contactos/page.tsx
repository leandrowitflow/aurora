import type { Metadata } from "next";
import Link from "next/link";
import { ComingSoonPanel } from "@/components/ComingSoonPanel";
import { DecoratedPage } from "@/components/DecoratedPage";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";
import { ReservationForm } from "@/components/ReservationForm";
import { SectionHeading } from "@/components/SectionHeading";
import { ShapeGap } from "@/components/PageDecorations";

export const metadata: Metadata = {
  title: "Contactos | Coletivo Aurora",
  description:
    "Morada, e-mail e formulário de contacto do Coletivo Aurora em Olhão.",
};

const CONTACT_ITEMS = [
  {
    label: "Morada",
    value: (
      <>
        Sítio do Pereiro nº 400F
        <br />
        Moncarapacho, 8700-073 Olhão
        <br />
        <span className="text-sm opacity-70">
          (antiga escola primária perto de Estiramantens)
        </span>
      </>
    ),
  },
  {
    label: "Estado",
    value: <span className="font-bold text-olive">Espaço em obras</span>,
  },
  {
    label: "E-mail",
    value: (
      <a
        href="mailto:somosaurora@gmail.com"
        className="font-bold text-olive underline transition-opacity hover:opacity-70"
      >
        somosaurora@gmail.com
      </a>
    ),
  },
  {
    label: "Telefone",
    value: (
      <a
        href="https://wa.me/351960289763"
        className="font-bold text-olive underline transition-opacity hover:opacity-70"
      >
        +351 960 289 763
      </a>
    ),
  },
];

export default function ContactosPage() {
  return (
    <PageShell>
      <DecoratedPage>
        <PageHero
          title="Contactos"
          subtitle="Estamos em Moncarapacho, Olhão, numa antiga escola primária a transformar-se em casa de encontro."
          imageSrc="/images/hero-contactos.webp"
        />

        <PageSection>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Visite-nos" title="Onde estamos" />
              <dl className="mt-10 space-y-8">
                {CONTACT_ITEMS.map((item) => (
                  <div key={item.label}>
                    <dt className="label-olive">{item.label}</dt>
                    <dd className="body-text mt-2">{item.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="body-text mt-10 flex flex-wrap gap-x-8 gap-y-2">
                <Link
                  href="https://www.instagram.com/coletivoaurora_algarve/"
                  className="font-bold text-olive underline transition-opacity hover:opacity-70"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.facebook.com/jardimauroraalgarve?locale=pt_PT"
                  className="font-bold text-olive underline transition-opacity hover:opacity-70"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </Link>
              </div>
            </div>

            <ComingSoonPanel
              label="Localização"
              title="Mapa"
              description="Integração do Google Maps disponível em breve. Sítio do Pereiro nº 400F, Moncarapacho, Olhão."
            />
          </div>
        </PageSection>

        <ShapeGap preset="loopLeft" />

        <PageSection>
          <div className="mx-auto max-w-[800px]">
            <ReservationForm
              formType="contacto"
              title="Contacto rápido"
              description="Envie-nos a sua mensagem e responderemos o mais breve possível."
              fields={[
                { name: "nome", label: "Nome", required: true },
                { name: "email", label: "E-mail", type: "email", required: true },
                { name: "contacto", label: "Contacto telefónico", type: "tel" },
                {
                  name: "mensagem",
                  label: "Mensagem",
                  type: "textarea",
                  required: true,
                  placeholder: "Como podemos ajudar?",
                },
              ]}
              submitLabel="Enviar mensagem"
            />
          </div>
        </PageSection>
      </DecoratedPage>
    </PageShell>
  );
}
