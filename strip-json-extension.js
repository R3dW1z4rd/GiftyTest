const fs = require("fs");
const path = require("path");

const METADATA_DIR = "./metadata";

fs.readdir(METADATA_DIR, (err, files) => {
  if (err) {
    return console.error("❌ Error reading metadata directory:", err);
  }

  files.forEach((file) => {
    const ext = path.extname(file);
    if (ext === ".json") {
      const oldPath = path.join(METADATA_DIR, file);
      const baseName = path.basename(file, ".json");
      const newPath = path.join(METADATA_DIR, baseName); // remove .json

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error(`❌ Failed to rename ${file}:`, err);
        } else {
          console.log(`✅ Renamed: ${file} → ${baseName}`);
        }
      });
    }
  });
});
