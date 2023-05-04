import { readFileSync, writeFileSync } from "fs";
import { log } from "console";

const outputDir = "../scraped/";

const linksPath = process.argv[3];
if (!linksPath) {
  log("❌ Path argument not found!");
  process.exit(1);
}

(async () => {
  const allLinks = readFileSync(linksPath, { encoding: "utf8" }).split("\n");
  allLinks.forEach(async (link) => {
    const url = new URL(link);
    const filename = url.pathname.replaceAll("/", "");
    const response = await fetch(link);
    const html = await response.text();
    writeFileSync(`${outputDir + filename}.html`, html);
  });
})();
