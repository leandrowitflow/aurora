import { CMS_BLOG_BASE_PATH, getSiteUrl, isCmsConfigured } from "@/lib/cms/config";
import { getSitemapEntries } from "@/lib/cms/posts";
import type { MetadataRoute } from "next";

const STATIC_ROUTES = [
  "",
  "/quem-somos",
  "/viver-o-coletivo",
  "/tecer-geracoes",
  "/calendario",
  "/inscricoes",
  "/fazer-parte",
  "/contactos",
  "/diario",
  "/transparencia",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  if (!isCmsConfigured()) {
    return staticEntries;
  }

  try {
    const posts = await getSitemapEntries();
    const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${siteUrl}${CMS_BLOG_BASE_PATH}/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticEntries, ...postEntries];
  } catch {
    return staticEntries;
  }
}
