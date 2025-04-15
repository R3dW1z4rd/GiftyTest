const fs = require("fs");
const path = require("path");

// Customize these
const METADATA_NAME = "Gifty Monsters ";
const METADATA_DESC = "Gifty Monsters is an NFT collection from outer space.";
const METADATA_DIR = "./metadata";
const GITHUB_IMAGE_BASE_URL =
  "https://raw.githubusercontent.com/R3dW1z4rd/GiftyTest/main/images/";

const updateMetadataFiles = () => {
  fs.readdir(METADATA_DIR, (err, files) => {
    if (err) {
      return console.error("Error reading metadata directory:", err);
    }

    files.forEach((file) => {
      const filePath = path.join(METADATA_DIR, file);

      // Only process JSON files
      if (path.extname(file) === ".json") {
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) {
            return console.error(`Error reading file ${file}:`, err);
          }

          try {
            const json = JSON.parse(data);
            const fileName = path.basename(file, ".json"); // e.g. '1' from '1.json'
            json.name = `${METADATA_NAME}#${fileName}`;
            json.description = `${METADATA_DESC}`;
            json.image = `${GITHUB_IMAGE_BASE_URL}${fileName}.png`;

            fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
              if (err) {
                return console.error(`Error writing file ${file}:`, err);
              }
              console.log(`Updated ${file}`);
            });
          } catch (parseErr) {
            console.error(`Error parsing JSON in ${file}:`, parseErr);
          }
        });
      }
    });
  });
};

updateMetadataFiles();
