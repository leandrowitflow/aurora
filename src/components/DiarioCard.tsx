import Image from "next/image";

interface DiarioCardProps {
  date: string;
  title: string;
  imageSrc: string;
}

export function DiarioCard({ date, title, imageSrc }: DiarioCardProps) {
  return (
    <article className="diario-card">
      <figure className="diario-card-media">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 88vw"
        />
        <figcaption className="diario-card-overlay">
          <span className="diario-card-date">{date}</span>
          <h3 className="diario-card-title">{title}</h3>
        </figcaption>
      </figure>
    </article>
  );
}
