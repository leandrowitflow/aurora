import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.dirname(fileURLToPath(import.meta.url));
const svgPath = path.join(root, "favicon.svg");
const publicDir = path.join(root, "../public");

const svg = fs.readFileSync(svgPath);

async function png(size) {
  return sharp(svg).resize(size, size).png().toBuffer();
}

const sizes = [16, 32, 48];
const pngBuffers = [];

for (const size of sizes) {
  const buffer = await png(size);
  pngBuffers.push(buffer);
  await sharp(buffer).toFile(path.join(publicDir, `favicon-${size}x${size}.png`));
}

await sharp(svg).resize(48, 48).png().toFile(path.join(publicDir, "icon.png"));
await sharp(svg).resize(180, 180).png().toFile(path.join(publicDir, "apple-icon.png"));

const { default: toIco } = await import("to-ico");
const ico = await toIco(pngBuffers);
fs.writeFileSync(path.join(publicDir, "favicon.ico"), ico);

console.log("Generated public/favicon.ico, icon.png, apple-icon.png, and PNG sizes.");
