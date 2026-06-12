interface DiarioCardProps {
  date: string;
  title: string;
  excerpt: string;
  imageSrc: string;
}

export function DiarioCard({ date, title, excerpt, imageSrc }: DiarioCardProps) {
  return (
    <article className="diario-card">
      <figure className="diario-card-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt="" />
        <figcaption className="diario-card-overlay">
          <span className="diario-card-date">{date}</span>
          <h3 className="diario-card-title">{title}</h3>
        </figcaption>
      </figure>
      <p className="diario-card-caption">{excerpt}</p>
    </article>
  );
}
