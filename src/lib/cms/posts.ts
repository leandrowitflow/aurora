import { isCmsConfigured, getCmsLocale } from "@/lib/cms/config";
import { cmsFetch } from "@/lib/cms/client";
import { sanitizePostContent } from "@/lib/cms/content";
import type {
  CmsPost,
  CmsPostListItem,
  CmsPostsResponse,
  CmsSitemapResponse,
} from "@/lib/cms/types";

const LIST_TAG = "cms-posts-list";

export async function getPublishedPosts(
  page = 1,
  limit = 24,
): Promise<{ posts: CmsPostListItem[]; total: number }> {
  if (!isCmsConfigured()) {
    return { posts: [], total: 0 };
  }

  const locale = getCmsLocale();
  const data = await cmsFetch<CmsPostsResponse>("/posts", {
    searchParams: { status: "published", page, limit, locale },
    tags: [LIST_TAG],
  });

  return {
    posts: data.posts,
    total: data.pagination.total,
  };
}

export async function getPublishedPostBySlug(slug: string): Promise<CmsPost | null> {
  if (!isCmsConfigured()) {
    return null;
  }

  const locale = getCmsLocale();

  try {
    return await cmsFetch<CmsPost>(`/posts/${encodeURIComponent(slug)}`, {
      searchParams: { locale },
      tags: [LIST_TAG, `cms-post-${slug}`],
    });
  } catch {
    return null;
  }
}

export async function getSitemapEntries() {
  if (!isCmsConfigured()) {
    return [];
  }

  const data = await cmsFetch<CmsSitemapResponse>("/sitemap", {
    tags: [LIST_TAG],
  });

  return data.urls;
}

export function formatPostDate(value: string | null | undefined): string {
  if (!value) {
    return "Em breve";
  }

  return new Intl.DateTimeFormat("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function getPostCoverImage(post: Pick<CmsPostListItem, "coverImageUrl">): string {
  return post.coverImageUrl ?? "/images/hero-diario.webp";
}

export function isRemoteCmsImage(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}

export { sanitizePostContent, stripAuthorBlocksFromContent, stripDuplicateCoverFromContent } from "@/lib/cms/content";
