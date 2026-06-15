import { parseContactPayload, sendContactEmail } from "@/lib/resend";

export const maxDuration = 30;

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const parsed = parseContactPayload(body);

  if (!parsed.ok) {
    return Response.json({ error: parsed.message }, { status: 400 });
  }

  try {
    await sendContactEmail(parsed.formType, parsed.data);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact email error:", error);
    return Response.json(
      {
        error:
          "Não foi possível enviar o pedido. Tente novamente ou escreva para somosaurora@gmail.com.",
      },
      { status: 502 },
    );
  }
}
