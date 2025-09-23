// compressImages.ts
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function compressImages() {
  const inputFolder = path.join(process.cwd(), "public/images/products");
  const outputFolder = path.join(process.cwd(), "public/images/optimized");

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  const files = fs.readdirSync(inputFolder);

  for (const file of files) {
    const inputPath = path.join(inputFolder, file);

    // Only process PNG files
    if (!file.toLowerCase().endsWith(".png")) continue;

    const outputFile = file.replace(/\.png$/i, ".jpg");
    const outputPath = path.join(outputFolder, outputFile);

    try {
      await sharp(inputPath)
        .resize(1600) // Max width 1600px, auto height
        .jpeg({ quality: 80 }) // Convert → JPG, 80% quality
        .toFile(outputPath);

      console.log(`✅ Compressed: ${file} → ${outputFile}`);
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }
}

compressImages();
