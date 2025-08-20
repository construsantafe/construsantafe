// optimize-images.js
import sharp from "sharp";
import fs from "fs";
import path from "path";

const imagesDir = "public/images";

// Tamaños que vamos a generar
const sizes = [600, 900, 1200, 1600];

// Formatos de salida
const formats = ["webp", "avif"];

async function generateImages(file) {
  const inputPath = path.join(imagesDir, file);
  const baseName = path.parse(file).name;

  for (const size of sizes) {
    for (const format of formats) {
      const outPath = path.join(imagesDir, `${baseName}-${size}.${format}`);
      try {
        await sharp(inputPath)
          .resize(size)
          .toFormat(format, { quality: 80 })
          .toFile(outPath);

        console.log(`✅ Optimizado: ${outPath}`);
      } catch (err) {
        console.error(`❌ Error con ${file}:`, err);
      }
    }
  }
}

async function run() {
  const files = fs.readdirSync(imagesDir).filter((f) => /\.(jpg|jpeg|png)$/i.test(f));

  console.log(`Encontradas ${files.length} imágenes en ${imagesDir}`);
  for (const file of files) {
    await generateImages(file);
  }

  console.log("🎉 Optimización completa");
}

run();
