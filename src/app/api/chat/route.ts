import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { AURORA_SYSTEM_PROMPT } from "@/lib/aurora-assistant";

export const maxDuration = 30;

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "O assistente não está configurado. Falta a chave OPENAI_API_KEY." },
      { status: 503 },
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

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: AURORA_SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
