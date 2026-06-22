import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const dir = "public/images";
const skip = new Set(["partners-logos.png", "footer-logo.png"]);
const exts = new Set([".png", ".jpg", ".jpeg"]);

let before = 0;
let after = 0;

for (const file of fs.readdirSync(dir)) {
  const ext = path.extname(file).toLowerCase();
  if (!exts.has(ext) || skip.has(file)) {
    continue;
  }

  const input = path.join(dir, file);
  const output = path.join(dir, file.replace(/\.(png|jpe?g)$/i, ".webp"));
  const inputSize = fs.statSync(input).size;
  before += inputSize;

  await sharp(input)
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(output);

  after += fs.statSync(output).size;
  console.log(`${file} -> ${path.basename(output)}`);
}

console.log(
  `Compressed ${Math.round(before / 1024 / 1024)}MB -> ${Math.round(after / 1024 / 1024)}MB`,
);
