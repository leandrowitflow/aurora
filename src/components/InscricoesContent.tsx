"use client";

import { ReservationForm } from "@/components/ReservationForm";
import { useEffect, useState } from "react";

type FormId = "ateliers" | "aniversarios" | "ferias" | "projeto";

const ATELIER_OPTIONS = [
  "Playgroups (0-2 anos)",
  "Ateliers para crianças (3-10 anos)",
  "Ateliers para famílias",
  "Ateliers para adultos",
  "Festas para crianças",
];

const FERIAS_WEEKS = [
  "Semana 1 — Julho",
  "Semana 2 — Julho",
  "Semana 3 — Agosto",
  "Semana 4 — Agosto",
];

const FORM_OPTIONS: {
  id: FormId;
  label: string;
  description: string;
  hash: string;
}[] = [
  {
    id: "ateliers",
    label: "Ateliers e oficinas",
    description: "Playgroups, crianças, famílias e adultos",
    hash: "ateliers",
  },
  {
    id: "aniversarios",
    label: "Festas de aniversário",
    description: "Celebrações com atividades na natureza",
    hash: "aniversarios",
  },
  {
    id: "ferias",
    label: "Campos de férias",
    description: "Semanas ao ar livre no Aurora",
    hash: "ferias",
  },
  {
    id: "projeto",
    label: "Tecendo gerações",
    description: "Inscrição no projeto social",
    hash: "inscricao-projeto",
  },
];

function hashToFormId(hash: string): FormId {
  const match = FORM_OPTIONS.find((option) => option.hash === hash.replace("#", ""));
  return match?.id ?? "ateliers";
}

export function InscricoesContent() {
  const [active, setActive] = useState<FormId>("ateliers");

  useEffect(() => {
    const syncFromHash = () => {
      setActive(hashToFormId(window.location.hash));
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  function selectForm(id: FormId, hash: string) {
    setActive(id);
    window.history.replaceState(null, "", `#${hash}`);
  }

  const activeOption = FORM_OPTIONS.find((option) => option.id === active)!;

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
          Preencher
        </span>
      </div>

      <div className="registration-grid">
        <nav className="registration-nav" aria-label="Tipo de inscrição">
          <p className="label-olive registration-nav-heading">Tipo de reserva</p>
          <ul className="registration-nav-list">
            {FORM_OPTIONS.map((option, index) => (
              <li key={option.id}>
                <button
                  type="button"
                  onClick={() => selectForm(option.id, option.hash)}
                  className={`registration-nav-item ${
                    active === option.id ? "registration-nav-item-active" : ""
                  }`}
                  aria-current={active === option.id ? "true" : undefined}
                >
                  <span className="registration-nav-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="registration-nav-copy">
                    <span className="registration-nav-label">{option.label}</span>
                    <span className="registration-nav-desc">{option.description}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <aside className="registration-aside">
            <p className="registration-aside-label">Agenda</p>
            <p className="registration-aside-text">
              O calendário interativo estará disponível em breve. Entraremos em
              contacto para confirmar a disponibilidade.
            </p>
          </aside>
        </nav>

        <div id={activeOption.hash} className="registration-form-area">
          <p className="label-olive">Formulário</p>
          {active === "ateliers" ? (
            <ReservationForm
              key="ateliers"
              title={activeOption.label}
              description="Para playgroups, ateliers de crianças, famílias e adultos."
              fields={[
                { name: "nome", label: "Nome", required: true },
                { name: "contacto", label: "Contacto", type: "tel", required: true },
                { name: "email", label: "E-mail", type: "email", required: true },
                {
                  name: "atividade",
                  label: "Atividade escolhida",
                  type: "select",
                  required: true,
                  options: ATELIER_OPTIONS,
                },
                {
                  name: "idade",
                  label: "Idade (se aplicável)",
                  type: "number",
                  placeholder: "Ex.: 4",
                },
              ]}
              submitLabel="Enviar inscrição"
            />
          ) : null}

          {active === "aniversarios" ? (
            <ReservationForm
              key="aniversarios"
              title={activeOption.label}
              fields={[
                { name: "responsavel", label: "Nome do responsável", required: true },
                { name: "contacto", label: "Contacto", type: "tel", required: true },
                { name: "email", label: "E-mail", type: "email", required: true },
                { name: "data", label: "Data pretendida", type: "date", required: true },
                {
                  name: "num_criancas",
                  label: "Número de crianças",
                  type: "number",
                  required: true,
                },
                {
                  name: "atividade",
                  label: "Atividade ou tema",
                  type: "textarea",
                  placeholder: "Descreva a atividade ou tema pretendido",
                },
              ]}
              submitLabel="Reservar aniversário"
            />
          ) : null}

          {active === "ferias" ? (
            <ReservationForm
              key="ferias"
              title={activeOption.label}
              fields={[
                { name: "crianca", label: "Nome da criança", required: true },
                { name: "idade", label: "Idade", type: "number", required: true },
                {
                  name: "semanas",
                  label: "Semanas escolhidas",
                  type: "select",
                  required: true,
                  options: FERIAS_WEEKS,
                },
                {
                  name: "encarregado",
                  label: "Contacto do encarregado de educação",
                  type: "tel",
                  required: true,
                },
                { name: "email", label: "E-mail", type: "email", required: true },
              ]}
              submitLabel="Inscrição nas férias"
            />
          ) : null}

          {active === "projeto" ? (
            <ReservationForm
              key="projeto"
              title={activeOption.label}
              description="Para participantes dos públicos prioritários do projeto social."
              fields={[
                { name: "nome", label: "Nome", required: true },
                { name: "contacto", label: "Contacto", type: "tel", required: true },
                { name: "email", label: "E-mail", type: "email", required: true },
                {
                  name: "motivo",
                  label: "Motivo de inscrição",
                  type: "textarea",
                  placeholder: "Conte-nos um pouco sobre si e o seu interesse no projeto",
                  required: true,
                },
              ]}
              submitLabel="Inscrição no projeto"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
