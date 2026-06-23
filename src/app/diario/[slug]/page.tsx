import { DiarioPostContent } from "@/components/DiarioPostContent";
import { PageHero } from "@/components/PageHero";
import { PageSection } from "@/components/PageSection";
import { PageShell } from "@/components/PageShell";
import { CMS_BLOG_BASE_PATH, getSiteUrl, isCmsConfigured } from "@/lib/cms/config";
import {
  formatPostDate,
  getPostCoverImage,
  getPublishedPostBySlug,
  getSitemapEntries,
  isRemoteCmsImage,
} from "@/lib/cms/posts";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface DiarioPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  if (!isCmsConfigured()) {
    return [];
  }

  const entries = await getSitemapEntries();
  return entries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: DiarioPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isCmsConfigured()) {
    return { title: "Diário do Aurora | Coletivo Aurora" };
  }

  const post = await getPublishedPostBySlug(slug);
  if (!post) {
    return { title: "Artigo não encontrado | Diário do Aurora" };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const image = post.ogImageUrl || post.coverImageUrl || undefined;
  const canonical = `${getSiteUrl()}${CMS_BLOG_BASE_PATH}/${post.slug}`;

  return {
    title: `${title} | Diário do Aurora`,
    description,
    alternates: {
      canonical: post.canonicalUrl || canonical,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function DiarioPostPage({ params }: DiarioPostPageProps) {
  const { slug } = await params;

  if (!isCmsConfigured()) {
    notFound();
  }

  const post = await getPublishedPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const coverImage = getPostCoverImage(post);
  const remoteCover = isRemoteCmsImage(coverImage);
  const canonical = `${getSiteUrl()}${CMS_BLOG_BASE_PATH}/${post.slug}`;
  const structuredData =
    post.structuredData && typeof post.structuredData === "object"
      ? post.structuredData
      : {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.seoDescription || post.excerpt,
          image: post.ogImageUrl || post.coverImageUrl || undefined,
          datePublished: post.publishedAt ?? undefined,
          dateModified: post.updatedAt,
          author: post.author
            ? {
                "@type": "Person",
                name: post.author.name,
              }
            : undefined,
          mainEntityOfPage: canonical,
        };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHero title={post.title} subtitle={post.excerpt} />

      <PageSection narrow className="pt-0 lg:pt-0">
        <div className="diario-article-meta">
          <Link href={CMS_BLOG_BASE_PATH} className="diario-back-link">
            ← Voltar ao Diário
          </Link>
          <time className="diario-article-date" dateTime={post.publishedAt ?? post.updatedAt}>
            {formatPostDate(post.publishedAt)}
          </time>
        </div>

        {post.coverImageUrl ? (
          <figure className="diario-article-cover">
            <Image
              src={coverImage}
              alt={post.coverImageAlt || post.title}
              width={1280}
              height={720}
              priority
              className="h-auto w-full object-cover"
              sizes="(min-width: 900px) 760px, 100vw"
              unoptimized={remoteCover}
            />
          </figure>
        ) : null}

        <DiarioPostContent content={post.content} author={post.author} />
      </PageSection>
    </PageShell>
  );
}
