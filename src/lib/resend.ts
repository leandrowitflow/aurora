import { Resend } from "resend";
import {
  AURORA_INBOX_EMAIL,
  buildEmailBody,
  extractReplyTo,
  FORM_SUBJECTS,
  isContactFormType,
  type ContactFormType,
} from "@/lib/email";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

function getFromAddress() {
  return (
    process.env.RESEND_FROM_EMAIL ??
    "Coletivo Aurora <onboarding@resend.dev>"
  );
}

function getInboxEmail() {
  return process.env.AURORA_INBOX_EMAIL ?? AURORA_INBOX_EMAIL;
}

export async function sendContactEmail(
  formType: ContactFormType,
  data: Record<string, string>,
) {
  const resend = getResendClient();

  if (!resend) {
    throw new Error("RESEND_API_KEY em falta");
  }

  const replyTo = extractReplyTo(data);
  const subjectBase = FORM_SUBJECTS[formType];
  const name = data.nome ?? data.responsavel ?? data.crianca ?? data.email;
  const subject = name ? `${subjectBase} — ${name}` : subjectBase;

  const { error } = await resend.emails.send({
    from: getFromAddress(),
    to: getInboxEmail(),
    replyTo,
    subject,
    text: buildEmailBody(formType, data),
  });

  if (error) {
    const message = error.message ?? "Erro ao enviar e-mail.";

    if (message.includes("domain is not verified")) {
      throw new Error(
        "RESEND_FROM_EMAIL usa um domínio não verificado. Verifique coletivoaurora.pt em resend.com/domains ou use onboarding@resend.dev para testes.",
      );
    }

    throw new Error(message);
  }
}

export function parseContactPayload(body: unknown):
  | { ok: true; formType: ContactFormType; data: Record<string, string> }
  | { ok: false; message: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, message: "Pedido inválido." };
  }

  const { formType, data } = body as {
    formType?: string;
    data?: Record<string, unknown>;
  };

  if (!formType || !isContactFormType(formType)) {
    return { ok: false, message: "Tipo de formulário inválido." };
  }

  if (!data || typeof data !== "object") {
    return { ok: false, message: "Dados do formulário em falta." };
  }

  const normalized: Record<string, string> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed) {
        normalized[key] = trimmed;
      }
    }
  }

  if (normalized._gotcha) {
    return { ok: false, message: "Pedido rejeitado." };
  }

  if (formType === "newsletter") {
    if (!normalized.email) {
      return { ok: false, message: "Indique um e-mail válido." };
    }
  } else if (!normalized.email && !normalized.contacto) {
    return { ok: false, message: "Indique e-mail ou contacto telefónico." };
  }

  return { ok: true, formType, data: normalized };
}
