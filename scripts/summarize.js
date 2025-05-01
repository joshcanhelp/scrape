import Anthropic from "@anthropic-ai/sdk";
import * as cheerio from "cheerio";
import { log } from "console";
import { readdirSync, readFileSync } from "fs";
import path from "path";

const anthropic = new Anthropic();

const outputDir = process.argv[2] || "./scraped";

(async () => {
  const htmlFiles = outputDir.endsWith(".html")
    ? [outputDir]
    : readdirSync(outputDir, { recursive: true }).filter((file) =>
      file.endsWith(".html")
    );

  if (!htmlFiles.length) {
    return log(`No HTML files found in ${outputDir}`);
  }

  for (const file of htmlFiles) {
    log(`Summarizing ${file}...`);
    const fullFilePath = file.startsWith("/")
      ? file
      : path.join(outputDir, file);
    const html = readFileSync(fullFilePath, { encoding: "utf8" });
    const $ = cheerio.load(html);
    const articleContent = $("div.ArticleLayout").text();

    if (!articleContent) {
      continue;
    }

    const msg = await anthropic.messages.create({
      model: "claude-3-5-haiku-latest",
      temperature: 1,
      max_tokens: 1000,
      system: "You are a senior software engineer. " +
        "You are tasked with summarizing the following article. " +
        "Please provide a 1 paragraph summary of the article.",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: articleContent,
            },
          ],
        },
      ],
    });
    console.log(msg.content.at(0)?.text);
    process.exit(0);
  }
})();
