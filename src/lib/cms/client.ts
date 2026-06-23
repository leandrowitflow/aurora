import { getCmsApiBaseUrl, getCmsApiKey, getCmsSiteId } from "@/lib/cms/config";

type CmsFetchOptions = {
  searchParams?: Record<string, string | number | undefined>;
  tags?: string[];
  revalidate?: number | false;
};

export async function cmsFetch<T>(path: string, options: CmsFetchOptions = {}): Promise<T> {
  const baseUrl = getCmsApiBaseUrl();
  const apiKey = getCmsApiKey();
  const siteId = getCmsSiteId();
  const url = new URL(`${baseUrl}/api/v1/sites/${siteId}${path}`);

  if (options.searchParams) {
    for (const [key, value] of Object.entries(options.searchParams)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    },
    next: {
      revalidate: options.revalidate ?? 3600,
      tags: options.tags,
    },
  });

  if (!response.ok) {
    throw new Error(`CMS API ${response.status}: ${path}`);
  }

  return response.json() as Promise<T>;
}
