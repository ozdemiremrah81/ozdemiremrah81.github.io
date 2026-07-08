// Image optimization script for the pastry website.
// Reads original Instagram screenshots from ./_source, lightly crops the
// Instagram UI chrome (side arrows / bottom dots), resizes and compresses
// them to modern WebP files in ./images.
//
// Run with:  node optimize.js

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join(__dirname, "_source");
const OUT = path.join(__dirname, "images");

// Crop percentages to remove Instagram overlay chrome from the edges.
const CROP = { left: 0.05, right: 0.05, top: 0.02, bottom: 0.055 };

async function run() {
  fs.mkdirSync(OUT, { recursive: true });

  const files = fs
    .readdirSync(SRC)
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .sort();

  if (files.length === 0) {
    console.error("No source images found in", SRC);
    process.exit(1);
  }

  let index = 0;
  for (const file of files) {
    index += 1;
    const input = path.join(SRC, file);
    const image = sharp(input).rotate(); // respect EXIF orientation
    const meta = await image.metadata();

    const w = meta.width || 0;
    const h = meta.height || 0;

    const left = Math.round(w * CROP.left);
    const top = Math.round(h * CROP.top);
    const cropW = Math.max(1, w - left - Math.round(w * CROP.right));
    const cropH = Math.max(1, h - top - Math.round(h * CROP.bottom));

    const name = `urun-${String(index).padStart(2, "0")}`;

    // Gallery-sized WebP
    await sharp(input)
      .rotate()
      .extract({ left, top, width: cropW, height: cropH })
      .resize({ width: 1080, height: 1080, fit: "cover", position: "attention" })
      .webp({ quality: 80 })
      .toFile(path.join(OUT, `${name}.webp`));

    // JPG fallback (smaller set of browsers)
    await sharp(input)
      .rotate()
      .extract({ left, top, width: cropW, height: cropH })
      .resize({ width: 1080, height: 1080, fit: "cover", position: "attention" })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(path.join(OUT, `${name}.jpg`));

    console.log(`optimized ${file} -> images/${name}.webp`);
  }

  // A wider hero image (uses the first source as a soft, atmospheric backdrop).
  const heroSource = path.join(SRC, files[0]);
  await sharp(heroSource)
    .rotate()
    .resize({ width: 1800, height: 1100, fit: "cover", position: "attention" })
    .webp({ quality: 82 })
    .toFile(path.join(OUT, "hero.webp"));

  console.log(`\nDone. ${files.length} images optimized into /images.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
