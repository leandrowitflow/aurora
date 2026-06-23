import { CMS_BLOG_BASE_PATH } from "@/lib/cms/config";
import {
  isDeleteWebhookEvent,
  parseCmsWebhookPayload,
  verifyCmsWebhookRequest,
} from "@/lib/cms/webhook";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_SECRET = process.env.CMS_WEBHOOK_SECRET;

function revalidateDiario(slug?: string) {
  revalidatePath(CMS_BLOG_BASE_PATH);
  revalidateTag("cms-posts-list", "max");

  if (slug) {
    revalidatePath(`${CMS_BLOG_BASE_PATH}/${slug}`);
    revalidateTag(`cms-post-${slug}`, "max");
  }
}

export async function POST(req: NextRequest) {
  if (!WEBHOOK_SECRET?.trim()) {
    return NextResponse.json(
      { error: "CMS_WEBHOOK_SECRET not configured" },
      { status: 500 },
    );
  }

  const rawBody = await req.text();
  const headerSecret = req.headers.get("x-webhook-secret");
  const signature = req.headers.get("x-cms-signature");
  const timestamp = req.headers.get("x-cms-timestamp");

  const authorized = verifyCmsWebhookRequest(
    rawBody,
    WEBHOOK_SECRET,
    headerSecret,
    signature,
    timestamp,
  );

  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload;
  try {
    payload = parseCmsWebhookPayload(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const slug = payload.post?.slug;

  if (isDeleteWebhookEvent(payload.event)) {
    revalidateDiario(slug);
    return NextResponse.json({ ok: true, revalidated: CMS_BLOG_BASE_PATH, slug });
  }

  revalidateDiario(slug);
  return NextResponse.json({ ok: true, revalidated: CMS_BLOG_BASE_PATH, slug });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
