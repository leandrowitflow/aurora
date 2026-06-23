const ABOUT_AUTHOR_HEADINGS = ["Sobre o autor", "About the author", "À propos de l'auteur"];

const AUTHOR_BLOCK_OPEN_RE =
  /<div[^>]*(?:\bid\s*=\s*["']author-block["']|\sclass\s*=\s*["'][^"']*author-block[^"']*["'])[^>]*>/i;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stripAuthorBlockHtml(content: string): string {
  let result = content;

  while (true) {
    const openMatch = result.match(AUTHOR_BLOCK_OPEN_RE);
    if (!openMatch || openMatch.index === undefined) {
      break;
    }

    const start = openMatch.index;
    let index = start + openMatch[0].length;
    let depth = 1;

    while (index < result.length && depth > 0) {
      const nextOpen = result.indexOf("<div", index);
      const nextClose = result.indexOf("</div>", index);

      if (nextClose === -1) {
        break;
      }

      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth += 1;
        index = nextOpen + 4;
        continue;
      }

      depth -= 1;
      index = nextClose + 6;
    }

    if (depth !== 0) {
      break;
    }

    result = `${result.slice(0, start)}${result.slice(index)}`;
  }

  return result;
}

/** Removes CMS-injected author HTML and "Sobre o autor" sections from post body. */
export function stripAuthorBlocksFromContent(content: string): string {
  let sanitized = content;
  let previous = "";

  while (sanitized !== previous) {
    previous = sanitized;
    sanitized = stripAuthorBlockHtml(sanitized);

    for (const heading of ABOUT_AUTHOR_HEADINGS) {
      const escaped = escapeRegExp(heading);
      const headingPattern = new RegExp(
        `(?:^|\\n)#{1,3}\\s*(?:\\*\\*)?\\s*${escaped}\\s*(?:\\*\\*)?\\s*\\n[\\s\\S]*?(?=\\n#{1,3}\\s|$)`,
        "gi",
      );
      sanitized = sanitized.replace(headingPattern, "");
    }
  }

  return sanitized.replace(/\n{3,}/g, "\n\n").trimEnd();
}

/** Remove a leading markdown image when it duplicates the post cover. */
export function stripDuplicateCoverFromContent(
  content: string,
  coverImageUrl: string | null,
): string {
  if (!coverImageUrl?.trim() || !content.trim()) {
    return content;
  }

  const trimmed = content.trimStart();
  const imagePattern = /^!\[[^\]]*]\(([^)]+)\)\s*/;
  const match = trimmed.match(imagePattern);

  if (!match) {
    return content;
  }

  const markdownUrl = match[1]?.trim();
  if (!markdownUrl) {
    return content;
  }

  try {
    const cover = new URL(coverImageUrl);
    const embedded = new URL(markdownUrl, coverImageUrl);
    if (cover.pathname === embedded.pathname) {
      return trimmed.slice(match[0].length).trimStart();
    }
  } catch {
    if (markdownUrl === coverImageUrl) {
      return trimmed.slice(match[0].length).trimStart();
    }
  }

  return content;
}

export function sanitizePostContent(
  content: string,
  coverImageUrl: string | null,
): string {
  return stripAuthorBlocksFromContent(
    stripDuplicateCoverFromContent(content, coverImageUrl),
  );
}
