import Image from "next/image";
import Link from "next/link";
import { formatPostDate, getPostCoverImage, isRemoteCmsImage } from "@/lib/cms/posts";

interface DiarioCardProps {
  slug: string;
  date: string;
  title: string;
  imageSrc: string;
}

export function DiarioCard({ slug, date, title, imageSrc }: DiarioCardProps) {
  const remote = isRemoteCmsImage(imageSrc);

  return (
    <article className="diario-card">
      <Link href={`/diario/${slug}`} className="group block w-full">
        <figure className="diario-card-media">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 88vw"
            unoptimized={remote}
          />
          <figcaption className="diario-card-overlay">
            <span className="diario-card-date">{date}</span>
            <h3 className="diario-card-title">{title}</h3>
          </figcaption>
        </figure>
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
