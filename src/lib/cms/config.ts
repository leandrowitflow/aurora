export const CMS_BLOG_BASE_PATH = "/diario";
export const CMS_DEFAULT_LOCALE = "pt";

export function isCmsConfigured(): boolean {
  return Boolean(
    process.env.CMS_API_BASE_URL?.trim() &&
      process.env.CMS_SITE_ID?.trim() &&
      getCmsApiKey(),
  );
}

export function getCmsApiKey(): string | undefined {
  return process.env.CMS_API_KEY?.trim() || process.env.CMS_WEBHOOK_SECRET?.trim();
}

export function getCmsSiteId(): string {
  const siteId = process.env.CMS_SITE_ID?.trim();
  if (!siteId) {
    throw new Error("CMS_SITE_ID is not configured");
  }
  return siteId;
}

export function getCmsApiBaseUrl(): string {
  const baseUrl = process.env.CMS_API_BASE_URL?.trim();
  if (!baseUrl) {
    throw new Error("CMS_API_BASE_URL is not configured");
  }
  return baseUrl.replace(/\/$/, "");
}

export function getCmsLocale(): string {
  return process.env.CMS_LOCALE?.trim() || CMS_DEFAULT_LOCALE;
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return `https://${vercelUrl.replace(/\/$/, "")}`;
  }

  return "https://coletivoaurora.pt";
}
