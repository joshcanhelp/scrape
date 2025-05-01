import * as cheerio from "cheerio";
import { log } from "console";
import { readdirSync, readFileSync, rmSync } from "fs";
import path from "path";

const outputDir = process.argv[2] || "./scraped";

(async () => {
  const htmlFiles = readdirSync(outputDir).filter((file) => file.endsWith(".html"));

  if (!htmlFiles.length) {
    return log(`No HTML files found in ${outputDir}`);
  }

  for (const file of htmlFiles) {
    log(`Parsing ${file}...`);
    const fullFilePath = path.join(outputDir, file);
    const html = readFileSync(fullFilePath, { encoding: "utf8" });
    const $ = cheerio.load(html);

    log($("head title").text());

    const articleTagsRaw = $("head").find("meta[property=article:tag]").prop("content");
    log(articleTagsRaw ? articleTagsRaw : "<no tags>");

    log("---")
  };
})();
