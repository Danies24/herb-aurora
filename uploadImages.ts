// uploadImages.ts
const fs = require("fs");
const path = require("path");
const cloudinary = require("./src/lib/cloudinaryConfig"); // no conflict now ✅

async function uploadImages() {
  const localFolder = path.join(process.cwd(), "public/images/optimized");

  const files = fs.readdirSync(localFolder);

  for (const file of files) {
    const filePath = path.join(localFolder, file);

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "products",
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      console.log(`✅ Uploaded: ${file} → ${result.secure_url}`);
    } catch (error) {
      console.error(`❌ Error uploading ${file}:`, error);
    }
  }
}

uploadImages();
