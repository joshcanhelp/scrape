import * as cheerio from "cheerio";
import { log } from "console";
import { readdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const logToParse = process.argv[2];
if (!logToParse) {
  log("❌ Need a log file to parse");
  process.exit(1);
}

const outputFile = process.argv[3] || "./links.txt";

const logLines = readFileSync(logToParse, { encoding: "utf8" }).split("\n");
if (!logLines.length) {
  log("❌ No log entries found");
  process.exit(1);
}

const urls = [];
for (const line of logLines) {
  const regexMatch = line.match(/^(?:.*) URL:(.*) \[(\d*)\/(?:\d*)(?:.*)$/);
  const url = regexMatch?.[1];
  if (!url || url.endsWith(".css") || url.endsWith(".txt")) {
    continue;
  }
  urls.push(url);
}
writeFileSync(outputFile, urls.join("\n"), { encoding: "utf8" });