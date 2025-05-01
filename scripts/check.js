import { readFileSync } from "fs";
import { log } from "console";

const linksPath = process.argv[2] || "./links.txt";
const outputDir = process.argv[3] || "./scraped";

(async () => {
  const allLinks = readFileSync(linksPath, { encoding: "utf8" }).split("\n");
  allLinks.forEach(async (link) => {
    const url = new URL(link);
    const filename = url.pathname.replaceAll("/", "");
    const fileExists = existsSync(`${outputDir + filename}.html`);
    log((fileExists ? "✅ " : "❌ ") + filename);
  });
})();
