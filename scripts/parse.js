import * as cheerio from "cheerio";
import { log } from "console";
import { readdirSync } from "fs";
import { readFileSync, writeFileSync } from "fs";

const outputDir = "../scraped/";

(async () => {
  readdirSync(outputDir).forEach((file) => {
    const html = readFileSync(outputDir + file, { encoding: "utf8" });
    const $ = cheerio.load(html);
    log($("title").text());
  });
})();
