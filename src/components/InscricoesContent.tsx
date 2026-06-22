"use client";

import { ReservationForm } from "@/components/ReservationForm";
import type { ContactFormType } from "@/lib/email";
import { useEffect, useState } from "react";

type FormId =
  | "playgroups"
  | "atelier-criancas"
  | "atelier-adultos"
  | "tecedo-geracoes"
  | "horta"
  | "ferias"
  | "aniversarios";

type FormField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "date" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
};

const LOCALIDADE_FIELD: FormField = {
  name: "localidade",
  label: "Localidade",
  placeholder: "Ex.: Olhão, Moncarapacho",
  required: true,
};

function contactFields(...extra: FormField[]): FormField[] {
  return [
    { name: "nome", label: "Nome", required: true },
    { name: "contacto", label: "Contacto", type: "tel", required: true },
    { name: "email", label: "E-mail", type: "email", required: true },
    LOCALIDADE_FIELD,
    ...extra,
  ];
}

const FERIAS_WEEKS = [
  "Semana 1, Julho",
  "Semana 2, Julho",
  "Semana 3, Agosto",
  "Semana 4, Agosto",
];

type FormConfig = {
  id: FormId;
  label: string;
  hash: string;
  formType: ContactFormType;
  fields: FormField[];
  submitLabel: string;
  description?: string;
};

const FORM_CONFIGS: FormConfig[] = [
  {
    id: "playgroups",
    label: "Playgroups",
    hash: "playgroups",
    formType: "inscricao-playgroups",
    fields: contactFields({
      name: "idade",
      label: "Idade do bebé",
      type: "number",
      placeholder: "Ex.: 1",
      required: true,
    }),
    submitLabel: "Enviar inscrição",
  },
  {
    id: "atelier-criancas",
    label: "Atelier crianças",
    hash: "atelier-criancas",
    formType: "inscricao-atelier-criancas",
    fields: contactFields({
      name: "idade",
      label: "Idade da criança",
      type: "number",
      placeholder: "Ex.: 6",
    }),
    submitLabel: "Enviar inscrição",
  },
  {
    id: "atelier-adultos",
    label: "Atelier adultos",
    hash: "atelier-adultos",
    formType: "inscricao-atelier-adultos",
    fields: contactFields(),
    submitLabel: "Enviar inscrição",
  },
  {
    id: "tecedo-geracoes",
    label: "Tecendo Gerações — projeto intergeracional",
    hash: "inscricao-projeto",
    formType: "inscricao-projeto",
    description: "Para participantes dos públicos prioritários do projeto social.",
    fields: contactFields({
      name: "motivo",
      label: "Motivo de inscrição",
      type: "textarea",
      placeholder: "Conte-nos um pouco sobre si e o seu interesse no projeto",
      required: true,
    }),
    submitLabel: "Inscrição no projeto",
  },
  {
    id: "horta",
    label: "Horta Permacultura",
    hash: "horta",
    formType: "inscricao-horta",
    fields: contactFields({
      name: "mensagem",
      label: "Mensagem (opcional)",
      type: "textarea",
      placeholder: "Interesse, disponibilidade ou dúvidas",
    }),
    submitLabel: "Enviar inscrição",
  },
  {
    id: "ferias",
    label: "Férias no Aurora",
    hash: "ferias",
    formType: "inscricao-ferias",
    fields: [
      { name: "crianca", label: "Nome da criança", required: true },
      { name: "idade", label: "Idade", type: "number", required: true },
      LOCALIDADE_FIELD,
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
    ],
    submitLabel: "Inscrição nas férias",
  },
  {
    id: "aniversarios",
    label: "Festas de aniversário",
    hash: "aniversarios",
    formType: "inscricao-aniversarios",
    fields: [
      { name: "responsavel", label: "Nome do responsável", required: true },
      { name: "contacto", label: "Contacto", type: "tel", required: true },
      { name: "email", label: "E-mail", type: "email", required: true },
      LOCALIDADE_FIELD,
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
    ],
    submitLabel: "Reservar aniversário",
  },
];

const HASH_ALIASES: Record<string, FormId> = {
  ateliers: "playgroups",
  "tecer-geracoes": "tecedo-geracoes",
};

function hashToFormId(hash: string): FormId {
  const normalized = hash.replace("#", "");
  const alias = HASH_ALIASES[normalized];
  if (alias) {
    return alias;
  }

  const match = FORM_CONFIGS.find((option) => option.hash === normalized);
  return match?.id ?? "playgroups";
}

export function InscricoesContent() {
  const [active, setActive] = useState<FormId>("playgroups");

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

  const activeConfig = FORM_CONFIGS.find((option) => option.id === active)!;

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
            {FORM_CONFIGS.map((option, index) => (
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

        <div id={activeConfig.hash} className="registration-form-area">
          <p className="label-olive">Formulário</p>
          <ReservationForm
            key={activeConfig.id}
            formType={activeConfig.formType}
            title={activeConfig.label}
            description={activeConfig.description}
            fields={activeConfig.fields}
            submitLabel={activeConfig.submitLabel}
          />
        </div>
      </div>
    </div>
  );
}
