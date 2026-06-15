export const AURORA_INBOX_EMAIL = "somosaurora@gmail.com";

export const FORM_SUBJECTS: Record<string, string> = {
  contacto: "Contacto do site",
  "inscricao-ateliers": "Inscrição — ateliers",
  "inscricao-aniversarios": "Inscrição — festa de aniversário",
  "inscricao-ferias": "Inscrição — campos de férias",
  "inscricao-projeto": "Inscrição — Tecendo gerações",
  voluntariado: "Ficha de voluntário",
  newsletter: "Newsletter — novo subscritor",
};

export type ContactFormType = keyof typeof FORM_SUBJECTS;

export function isContactFormType(value: string): value is ContactFormType {
  return value in FORM_SUBJECTS;
}

export function formatFieldLabel(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function buildEmailBody(
  formType: ContactFormType,
  data: Record<string, string>,
): string {
  const lines = [
    `Novo pedido: ${FORM_SUBJECTS[formType]}`,
    `Origem: coletivoaurora.pt`,
    "",
    ...Object.entries(data)
      .filter(([key]) => !key.startsWith("_"))
      .map(([key, value]) => `${formatFieldLabel(key)}: ${value}`),
  ];

  return lines.join("\n");
}

export function extractReplyTo(data: Record<string, string>): string | undefined {
  const email = data.email?.trim();
  if (!email || !email.includes("@")) {
    return undefined;
  }

  return email;
}
