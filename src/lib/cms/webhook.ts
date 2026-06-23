import crypto from "crypto";
import type { CmsWebhookPayload } from "@/lib/cms/types";

const MAX_TIMESTAMP_AGE_MS = 5 * 60 * 1000;

export function verifyCmsWebhookRequest(
  rawBody: string,
  secret: string | undefined,
  headerSecret: string | null,
  signature: string | null,
  timestamp: string | null,
): boolean {
  if (!secret?.trim()) {
    return false;
  }

  if (headerSecret === secret) {
    return isTimestampFresh(timestamp);
  }

  if (!signature) {
    return false;
  }

  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  try {
    const signatureOk = crypto.timingSafeEqual(
      Buffer.from(expected, "utf8"),
      Buffer.from(signature, "utf8"),
    );
    return signatureOk && isTimestampFresh(timestamp);
  } catch {
    return false;
  }
}

function isTimestampFresh(timestamp: string | null): boolean {
  if (!timestamp) {
    return true;
  }

  const parsed = Date.parse(timestamp);
  if (Number.isNaN(parsed)) {
    return true;
  }

  return Math.abs(Date.now() - parsed) <= MAX_TIMESTAMP_AGE_MS;
}

export function parseCmsWebhookPayload(rawBody: string): CmsWebhookPayload {
  return JSON.parse(rawBody) as CmsWebhookPayload;
}

export function isDeleteWebhookEvent(event: string | undefined): boolean {
  return event === "post.deleted" || event === "post.unpublished";
}
