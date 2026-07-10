import fs from "fs";
import path from "path";

import { buildSearchIndex } from "@/lib/content/search";

const OUTPUT = path.join(
  process.cwd(),
  "public",
  "search-index.json"
);

const index = buildSearchIndex();

fs.mkdirSync(path.dirname(OUTPUT), {
  recursive: true,
});

const json = JSON.stringify(index, null, 2);

fs.writeFileSync(OUTPUT, json, "utf8");

console.log(
  `✓ Generated ${index.length} search documents`
);