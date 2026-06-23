export interface CmsAuthor {
  id: string;
  name: string;
  slug: string;
  jobTitle: string | null;
  bio: string | null;
  avatarUrl: string | null;
}

export interface CmsPostListTranslation {
  title: string;
  excerpt: string;
  seoTitle: string | null;
}

export interface CmsPostListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string | null;
  coverImageAlt: string | null;
  publishedAt: string | null;
  updatedAt: string;
  author: CmsAuthor | null;
  seoTitle: string | null;
  locale: string;
  translations: Record<string, CmsPostListTranslation>;
}

export interface CmsPostTranslation {
  title: string;
  excerpt: string;
  content: string;
  seoTitle: string | null;
  seoDescription: string | null;
  author: CmsAuthor | null;
}

export interface CmsPost extends CmsPostListItem {
  content: string;
  seoDescription: string | null;
  canonicalUrl: string | null;
  ogImageUrl: string | null;
  structuredData: unknown;
  translations: Record<string, CmsPostTranslation>;
}

export interface CmsPostsResponse {
  posts: CmsPostListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CmsSitemapEntry {
  slug: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface CmsSitemapResponse {
  urls: CmsSitemapEntry[];
}

export type CmsWebhookEvent =
  | "post.published"
  | "post.updated"
  | "post.deleted"
  | "post.unpublished"
  | "cms.post.published"
  | "cms.post.updated";

export interface CmsWebhookPayload {
  event: CmsWebhookEvent;
  siteId: string;
  post?: {
    id?: string;
    slug?: string;
    status?: string;
    updatedAt?: string;
  };
  timestamp?: string;
  signatureVersion?: string;
}
