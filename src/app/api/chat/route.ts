import { google } from "@ai-sdk/google";
import { APICallError } from "@ai-sdk/provider";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { ASSISTANT_MODEL, AURORA_SYSTEM_PROMPT } from "@/lib/aurora-assistant";

export const maxDuration = 30;

type WrappedError = {
  lastError?: unknown;
  errors?: unknown[];
  cause?: unknown;
};

function asApiCallError(error: unknown): APICallError | undefined {
  if (error instanceof APICallError) {
    return error;
  }

  if (!error || typeof error !== "object") {
    return undefined;
  }

  const wrapped = error as WrappedError;

  if (wrapped.lastError instanceof APICallError) {
    return wrapped.lastError;
  }

  if (wrapped.cause instanceof APICallError) {
    return wrapped.cause;
  }

  if (Array.isArray(wrapped.errors)) {
    for (let index = wrapped.errors.length - 1; index >= 0; index -= 1) {
      const nested = wrapped.errors[index];
      if (nested instanceof APICallError) {
        return nested;
      }
    }
  }

  return undefined;
}

function assistantErrorMessage(error: unknown): string {
  const apiError = asApiCallError(error);
  const message = (
    apiError?.message ??
    (error instanceof Error ? error.message : String(error))
  ).toLowerCase();

  if (
    apiError?.statusCode === 429 ||
    message.includes("quota") ||
    message.includes("exceeded")
  ) {
    if (message.includes("limit: 0") || message.includes("free_tier")) {
      return "Este modelo requer faturação ativa no Google AI Studio (plano pago). Ative billing em aistudio.google.com e reinicie o servidor.";
    }

    return "Limite de utilização da API Gemini atingido. Aguarde um minuto e tente novamente.";
  }

  if (
    apiError?.statusCode === 403 ||
    message.includes("denied access") ||
    message.includes("permission_denied")
  ) {
    return "O projeto desta chave API foi bloqueado para modelos Flash. Crie uma nova chave em aistudio.google.com/apikey ou defina GEMINI_ASSISTANT_MODEL=gemini-3.1-pro-preview com faturação ativa.";
  }

  if (apiError?.statusCode === 401 || message.includes("api key")) {
    return "Chave API Gemini inválida. Verifique GOOGLE_GENERATIVE_AI_API_KEY no .env.";
  }

  if (message.includes("not found") || message.includes("is not supported")) {
    return "Modelo Gemini não encontrado. Use gemini-3.1-flash-lite (predefinição) ou gemini-3.5-flash.";
  }

  return "Não foi possível obter resposta do assistente. Tente novamente.";
}

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error:
          "O assistente não está configurado. Falta a chave GOOGLE_GENERATIVE_AI_API_KEY.",
      },
      { status: 503 },
    );
  }

  if (!apiKey.startsWith("AIza") && !apiKey.startsWith("AQ.")) {
    console.warn(
      "GOOGLE_GENERATIVE_AI_API_KEY: formato inesperado. Use uma chave de aistudio.google.com/apikey.",
    );
  }

  let messages: UIMessage[];

  try {
    ({ messages } = await req.json());
  } catch {
    return Response.json({ error: "Pedido inválido." }, { status: 400 });
  }

  if (!Array.isArray(messages)) {
    return Response.json({ error: "Mensagens em falta." }, { status: 400 });
  }

  const modelId = process.env.GEMINI_ASSISTANT_MODEL ?? ASSISTANT_MODEL;

  try {
    const result = streamText({
      model: google(modelId),
      system: AURORA_SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      maxRetries: 0,
      providerOptions:
        modelId.includes("flash") && !modelId.includes("pro")
          ? {
              google: {
                thinkingConfig: {
                  thinkingBudget: 0,
                },
              },
            }
          : undefined,
    });

    return result.toUIMessageStreamResponse({
      onError: (error) => assistantErrorMessage(error),
    });
  } catch (error) {
    console.error("Assistant chat error:", error);
    return Response.json(
      { error: assistantErrorMessage(error) },
      { status: 502 },
    );
  }
}
