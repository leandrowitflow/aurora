interface DiarioCardProps {
  date: string;
  title: string;
  excerpt: string;
}

export function DiarioCard({ date, title, excerpt }: DiarioCardProps) {
  return (
    <article className="diario-entry">
      <p className="label-olive">{date}</p>
      <h3 className="heading-subsection mt-3">{title}</h3>
      <p className="body-text mt-3">{excerpt}</p>
      <span className="diario-entry-tag">Publicação em breve</span>
    </article>
  );
}
