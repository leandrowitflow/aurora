interface TopicTagListProps {
  items: readonly string[];
  label?: string;
}

export function TopicTagList({ items, label = "Atividades" }: TopicTagListProps) {
  return (
    <div>
      <p className="label-olive mb-6">{label}</p>
      <ul className="topic-tag-list">
        {items.map((item) => (
          <li key={item}>
            <span className="topic-tag">
              <span className="topic-tag-marker" aria-hidden />
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
