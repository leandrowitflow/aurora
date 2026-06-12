"use client";

import { Button } from "@/components/Button";
import { ReservationForm } from "@/components/ReservationForm";
import { useEffect, useState } from "react";

type PillarId = "voluntariado" | "donativos" | "amigos" | "parcerias";

const PILLAR_OPTIONS: {
  id: PillarId;
  label: string;
  description: string;
  hash: string;
  featured?: boolean;
}[] = [
  {
    id: "voluntariado",
    label: "Voluntariado",
    description: "Tempo, energia e presença na comunidade",
    hash: "voluntariado",
  },
  {
    id: "donativos",
    label: "Donativos pontuais",
    description: "Materiais pedagógicos e horta comunitária",
    hash: "donativos",
  },
  {
    id: "amigos",
    label: "Amigos do Aurora",
    description: "Apoio mensal ao Tecendo gerações",
    hash: "amigos",
    featured: true,
  },
  {
    id: "parcerias",
    label: "Parcerias",
    description: "Empresas, escolas e instituições",
    hash: "parcerias",
  },
];

function hashToPillarId(hash: string): PillarId {
  const normalized = hash.replace("#", "");
  if (normalized === "ficha-voluntario") {
    return "voluntariado";
  }
  const match = PILLAR_OPTIONS.find((option) => option.hash === normalized);
  return match?.id ?? "voluntariado";
}

export function FazerParteContent() {
  const [active, setActive] = useState<PillarId>("voluntariado");

  useEffect(() => {
    const syncFromHash = () => {
      setActive(hashToPillarId(window.location.hash));
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  function selectPillar(id: PillarId, hash: string) {
    setActive(id);
    window.history.replaceState(null, "", `#${hash}`);
  }

  const activeOption = PILLAR_OPTIONS.find((option) => option.id === active)!;

  return (
    <div className="registration-layout">
      <div className="registration-steps" aria-hidden="true">
        <span className="registration-step registration-step-active">
          <span className="registration-step-num">1</span>
          Escolher
        </span>
        <span className="registration-step-line" />
        <span className="registration-step">
          <span className="registration-step-num">2</span>
          Contribuir
        </span>
      </div>

      <div className="registration-grid">
        <nav className="registration-nav" aria-label="Formas de apoio">
          <p className="label-olive registration-nav-heading">Como quer apoiar</p>
          <ul className="registration-nav-list">
            {PILLAR_OPTIONS.map((option, index) => (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => selectPillar(option.id, option.hash)}
                  className={`registration-nav-item ${
                    active === option.id ? "registration-nav-item-active" : ""
                  } ${option.featured ? "registration-nav-item-featured" : ""}`}
                  aria-current={active === option.id ? "true" : undefined}
                >
                  <span className="registration-nav-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="registration-nav-copy">
                    <span className="registration-nav-label">
                      {option.label}
                      {option.featured ? (
                        <span className="support-featured-badge">Destaque</span>
                      ) : null}
                    </span>
                    <span className="registration-nav-desc">{option.description}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <aside className="registration-aside">
            <p className="registration-aside-label">Impacto</p>
            <p className="registration-aside-text">
              Cada forma de apoio sustenta o Tecendo gerações e mantém vivo o
              encontro entre gerações no Aurora.
            </p>
          </aside>
        </nav>

        <div
          id={active === "voluntariado" ? "ficha-voluntario" : activeOption.hash}
          className={`registration-form-area ${
            active === "amigos" ? "support-panel-featured" : ""
          }`}
        >
          {active === "voluntariado" ? (
            <>
              <p className="label-olive">Tempo e presença</p>
              <h3 className="heading-subsection mt-2">Voluntariado</h3>
              <div className="body-text mt-6 space-y-4">
                <p>
                  A nossa comunidade cresce com a energia de quem chega. Se tem
                  disponibilidade (mínima de 3h por semana ou de forma ocasional
                  em eventos de grande dimensão), há um lugar para si.
                </p>
                <p>
                  Procuramos apoio em: acompanhamento em ateliês, manutenção e
                  cultivo da horta, documentação fotográfica/escrita e apoio
                  administrativo.
                </p>
              </div>

              <div className="support-form-divider" />
              <ReservationForm
                key="voluntariado"
                title="Ficha de voluntário"
                description="Conte-nos como gostaria de contribuir para o Coletivo Aurora."
                fields={[
                  { name: "nome", label: "Nome", required: true },
                  { name: "contacto", label: "Contacto", type: "tel", required: true },
                  { name: "email", label: "E-mail", type: "email", required: true },
                  {
                    name: "disponibilidade",
                    label: "Disponibilidade",
                    type: "select",
                    required: true,
                    options: [
                      "Semanal (3h+)",
                      "Ocasional em eventos",
                      "Pontual conforme agenda",
                    ],
                  },
                  {
                    name: "areas",
                    label: "Áreas de interesse",
                    type: "textarea",
                    placeholder:
                      "Ateliês, horta, documentação, apoio administrativo...",
                    required: true,
                  },
                ]}
                submitLabel="Enviar ficha"
              />
            </>
          ) : null}

          {active === "donativos" ? (
            <>
              <p className="label-olive">Contributo direto</p>
              <h3 className="heading-subsection mt-2">Donativos pontuais</h3>
              <div className="body-text mt-6">
                <p>
                  Cada contributo direto é totalmente canalizado para a compra de
                  materiais pedagógicos e ferramentas para a horta comunitária.
                </p>
              </div>

              <dl className="support-detail-list">
                <div>
                  <dt>MBWay</dt>
                  <dd>A definir</dd>
                </div>
                <div>
                  <dt>IBAN</dt>
                  <dd>A definir</dd>
                </div>
              </dl>

              <p className="support-detail-note">
                Emitimos recibo de donativo para valores superiores a 100 euros.
              </p>
            </>
          ) : null}

          {active === "amigos" ? (
            <>
              <p className="label-olive">Apoio mensal</p>
              <h3 className="heading-subsection mt-2">Amigos do Aurora</h3>
              <div className="body-text mt-6">
                <p>
                  Uma forma contínua e estruturada de apoiar o nosso projeto
                  social. Com um contributo fixo, ajuda-nos a planear o futuro do
                  Tecendo gerações com estabilidade.
                </p>
              </div>

              <p className="support-quota">10 euros / mês</p>

              <ul className="support-benefits-list">
                <li>10% de desconto em ateliers pagos do Viver o coletivo</li>
                <li>Convite exclusivo ao evento anual do Aurora</li>
                <li>
                  O seu nome na parede dos amigos do Aurora (se assim o desejar)
                </li>
              </ul>

              <div className="mt-10">
                <Button href="/contactos" label="Tornar-me amigo do Aurora" />
              </div>
            </>
          ) : null}

          {active === "parcerias" ? (
            <>
              <p className="label-olive">Rede e território</p>
              <h3 className="heading-subsection mt-2">Parcerias</h3>
              <div className="body-text mt-6">
                <p>
                  Trabalhamos em rede com empresas, escolas, juntas de freguesia
                  e fundações que partilham dos nossos valores ecológicos e
                  humanos. Desenhamos parcerias à medida do impacto que queremos
                  criar juntos no território do Algarve.
                </p>
              </div>

              <div className="mt-10">
                <Button href="/contactos" label="Contactar para parcerias" />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
