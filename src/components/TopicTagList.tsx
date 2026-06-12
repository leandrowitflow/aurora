export type TopicTagItem =
  | string
  | {
      title: string;
      description?: string;
    };

interface TopicTagListProps {
  items: readonly TopicTagItem[];
  label?: string;
}

function normalizeItem(item: TopicTagItem) {
  return typeof item === "string" ? { title: item } : item;
}

export function TopicTagList({ items, label = "Atividades" }: TopicTagListProps) {
  return (
    <div className="topic-tag-list" aria-labelledby="topic-tag-list-title">
      <div className="topic-tag-list-header">
        <h2 id="topic-tag-list-title" className="heading-subsection">
          {label}
        </h2>
        <div className="topic-tag-list-rule" aria-hidden="true" />
      </div>

      <ul className="topic-tag-grid">
        {items.map((item, index) => {
          const { title, description } = normalizeItem(item);

          return (
            <li key={title}>
              <article className="topic-tag-card">
                <span className="topic-tag-card-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="topic-tag-card-copy">
                  <h3 className="topic-tag-card-title">{title}</h3>
                  {description ? (
                    <p className="topic-tag-card-desc">{description}</p>
                  ) : null}
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
