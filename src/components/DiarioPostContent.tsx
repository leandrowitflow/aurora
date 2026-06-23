import Image from "next/image";
import Link from "next/link";
import type { CmsAuthor } from "@/lib/cms/types";
import { isRemoteCmsImage } from "@/lib/cms/posts";
import Markdown from "react-markdown";

interface DiarioPostContentProps {
  content: string;
  author: CmsAuthor | null;
}

export function DiarioPostContent({ content, author }: DiarioPostContentProps) {
  return (
    <div className="diario-article">
      <div className="diario-prose">
        <Markdown
          components={{
            a: ({ href, children }) => {
              if (!href) {
                return <span>{children}</span>;
              }

              const external = href.startsWith("http");
              return (
                <Link
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  {children}
                </Link>
              );
            },
            img: ({ src, alt }) => {
              if (!src || typeof src !== "string") {
                return null;
              }

              const remote = isRemoteCmsImage(src);
              return (
                <span className="diario-prose-image">
                  <Image
                    src={src}
                    alt={alt ?? ""}
                    width={1200}
                    height={675}
                    className="h-auto w-full"
                    sizes="(min-width: 900px) 760px, 100vw"
                    unoptimized={remote}
                  />
                </span>
              );
            },
          }}
        >
          {content}
        </Markdown>
      </div>

      {author ? (
        <footer className="diario-author">
          {author.avatarUrl ? (
            <Image
              src={author.avatarUrl}
              alt=""
              width={64}
              height={64}
              className="diario-author-avatar"
              unoptimized={isRemoteCmsImage(author.avatarUrl)}
            />
          ) : null}
          <div>
            <p className="diario-author-name">{author.name}</p>
            {author.jobTitle ? (
              <p className="diario-author-role">{author.jobTitle}</p>
            ) : null}
            {author.bio ? <p className="diario-author-bio">{author.bio}</p> : null}
          </div>
        </footer>
      ) : null}
    </div>
  );
}
