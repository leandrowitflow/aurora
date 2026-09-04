"use client";

import { useCallback, useEffect } from "react";
import { createRoot } from "react-dom/client";

function nodeToMarkdown(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent?.trim() ?? "";
    return text ? `${text} ` : "";
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return "";
  }

  const element = node as Element;
  const tag = element.tagName.toLowerCase();
  const children = Array.from(element.childNodes)
    .map(nodeToMarkdown)
    .join("")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  switch (tag) {
    case "h1":
      return `\n\n# ${children}\n\n`;
    case "h2":
      return `\n\n## ${children}\n\n`;
    case "h3":
      return `\n\n### ${children}\n\n`;
    case "h4":
      return `\n\n#### ${children}\n\n`;
    case "p":
      return `\n\n${children}\n\n`;
    case "a": {
      const href = element.getAttribute("href") ?? "";
      const isExternal = href.startsWith("http");
      return isExternal ? `[${children.trim()}](${href})` : children;
    }
    case "li":
      return `\n- ${children.replace(/^\s+|\s+$/g, "")}`;
    case "ul":
    case "ol":
      return `\n${children}\n`;
    case "strong":
    case "b":
      return `**${children.trim()}** `;
    case "em":
    case "i":
      return `_${children.trim()}_ `;
    case "img": {
      const alt = element.getAttribute("alt") ?? "";
      const src = element.getAttribute("src") ?? "";
      return alt ? `\n![${alt}](${src})\n` : "";
    }
    case "script":
    case "style":
    case "noscript":
      return "";
    default:
      return children;
  }
}

function downloadMarkdown() {
  const main = document.querySelector("main");
  if (!main) {
    return;
  }

  const title = document.title || "Coletivo Aurora";
  const url = window.location.href;
  const slug =
    url
      .replace(/https?:\/\/[^/]+/, "")
      .replace(/\//g, "-")
      .replace(/^-|-$/g, "") || "page";

  const bodyMarkdown = nodeToMarkdown(main)
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const markdown = `# ${title}\n\nSource: ${url}\n\n---\n\n${bodyMarkdown}`;
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const blobUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = blobUrl;
  anchor.download = `${slug}.md`;
  anchor.click();
  URL.revokeObjectURL(blobUrl);
}

function FileTextIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function DownloadButton() {
  return (
    <button
      type="button"
      onClick={downloadMarkdown}
      aria-label="Transferir página em Markdown"
      title="Transferir como Markdown"
      className="copy-page-md-btn"
    >
      <FileTextIcon />
    </button>
  );
}

export default function CopyPageAsMarkdown() {
  const injectButtons = useCallback(() => {
    const main = document.querySelector("main");
    if (!main) {
      return;
    }

    const headings = Array.from(main.querySelectorAll("h1"));

    headings.forEach((heading) => {
      if (heading.querySelector("[data-md-download]")) {
        return;
      }

      const wrapper = document.createElement("span");
      wrapper.setAttribute("data-md-download", "true");
      wrapper.className = "copy-page-md-anchor";
      heading.appendChild(wrapper);

      const root = createRoot(wrapper);
      root.render(<DownloadButton />);
    });
  }, []);

  useEffect(() => {
    injectButtons();

    const main = document.querySelector("main");
    if (!main) {
      return undefined;
    }

    const observer = new MutationObserver(() => {
      injectButtons();
    });

    observer.observe(main, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [injectButtons]);

  return null;
}
