import fs from "node:fs";
import path from "node:path";

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(filePath);
      continue;
    }

    if (!/\.(tsx?|jsx?)$/.test(entry.name)) {
      continue;
    }

    let source = fs.readFileSync(filePath, "utf8");
    const original = source;

    source = source.replaceAll("/images/hero-bg.jpg", "/images/hero-bg.webp");
    source = source.replace(/\/images\/([a-z0-9-]+)\.png/g, (match, name) => {
      if (name === "partners-logos" || name === "footer-logo") {
        return match;
      }

      return `/images/${name}.webp`;
    });

    if (source !== original) {
      fs.writeFileSync(filePath, source);
      console.log("updated", filePath);
    }
  }
}

walk("src");
