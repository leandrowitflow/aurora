import { Button } from "@/components/Button";
import Image from "next/image";
import type { ReactNode } from "react";

interface ActivityBlockProps {
  id?: string;
  index: number;
  title: string;
  tag?: string;
  description: ReactNode;
  imageSrc?: string;
  buttonLabel?: string;
  buttonHref?: string;
  note?: string;
}

export function ActivityBlock({
  id,
  index,
  title,
  tag,
  description,
  imageSrc,
  buttonLabel,
  buttonHref,
  note,
}: ActivityBlockProps) {
  const reverse = index % 2 === 0;

  return (
    <article
      id={id}
      className={`activity-card ${imageSrc ? "" : "activity-card-text-only"} ${
        reverse ? "activity-card-reverse" : ""
      }`}
    >
      {imageSrc ? (
        <div className="activity-card-image">
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>
      ) : null}

      <div className="activity-card-body">
        {tag ? <span className="activity-card-tag">{tag}</span> : null}
        <h3 className="heading-subsection mt-5">{title}</h3>
        <div className="body-text mt-4">{description}</div>
        {note ? (
          <p className="body-text mt-4 font-bold text-olive">{note}</p>
        ) : null}
        {buttonLabel && buttonHref ? (
          <div className="mt-8">
            <Button href={buttonHref} label={buttonLabel} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
