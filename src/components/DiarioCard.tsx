import { CmsImage } from "@/components/CmsImage";
import Link from "next/link";
import { formatPostDate, getPostCoverImage } from "@/lib/cms/posts";

interface DiarioCardProps {
  slug: string;
  date: string;
  title: string;
  imageSrc: string;
}

export function DiarioCard({ slug, date, title, imageSrc }: DiarioCardProps) {
  return (
    <article className="diario-card">
      <Link href={`/diario/${slug}`} className="group block w-full">
        <figure className="diario-card-media">
          <CmsImage
            src={imageSrc}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 88vw"
          />
        </figure>
        <div className="diario-card-caption">
          <time className="diario-card-date">{date}</time>
          <h3 className="diario-card-title">{title}</h3>
        </div>
      </Link>
    </article>
  );
}

export function DiarioCardFromPost({
  slug,
  title,
  publishedAt,
  coverImageUrl,
}: {
  slug: string;
  title: string;
  publishedAt: string | null;
  coverImageUrl: string | null;
}) {
  return (
    <DiarioCard
      slug={slug}
      title={title}
      date={formatPostDate(publishedAt)}
      imageSrc={getPostCoverImage({ coverImageUrl })}
    />
  );
}
