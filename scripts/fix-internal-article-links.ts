import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(
  process.cwd(),
  "content",
  "collections"
);

type ArticleRecord = {
  title: string;
  slug: string;
  category: string;
  filePath: string;
  url: string;
};

function getMdxFiles(directory: string): string[] {
  const entries = fs.readdirSync(directory, {
    withFileTypes: true,
  });

  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return getMdxFiles(fullPath);
    }

    if (entry.isFile() && entry.name.endsWith(".mdx")) {
      return [fullPath];
    }

    return [];
  });
}

function normalizeTitle(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

const files = getMdxFiles(CONTENT_ROOT);

const articles: ArticleRecord[] = [];

for (const filePath of files) {
  const raw = fs.readFileSync(filePath, "utf8");

  if (!raw.trim()) {
    continue;
  }

  const { data } = matter(raw);

  if (
    typeof data.title !== "string" ||
    typeof data.slug !== "string" ||
    typeof data.category !== "string"
  ) {
    console.warn(
      `Skipping article with incomplete frontmatter: ${filePath}`
    );

    continue;
  }

  articles.push({
    title: data.title.trim(),
    slug: data.slug.trim(),
    category: data.category.trim(),
    filePath,
    url: `/resources/${data.category.trim()}/${data.slug.trim()}`,
  });
}

const articlesByTitle = new Map<string, ArticleRecord[]>();

for (const article of articles) {
  const key = normalizeTitle(article.title);
  const existing = articlesByTitle.get(key) ?? [];

  existing.push(article);

  articlesByTitle.set(key, existing);
}

const ambiguousTitles = new Set<string>();

for (const [title, matches] of articlesByTitle.entries()) {
  if (matches.length > 1) {
    ambiguousTitles.add(title);
  }
}

const bareBoldBulletPattern =
  /^(\s*)-\s+\*\*(.+?)\*\*\s*$/gm;

let totalLinked = 0;
let filesChanged = 0;

const unmatched = new Map<string, Set<string>>();
const ambiguous = new Map<string, Set<string>>();

for (const filePath of files) {
  const raw = fs.readFileSync(filePath, "utf8");

  if (!raw.trim()) {
    continue;
  }

  let fileLinked = 0;

  const updated = raw.replace(
    bareBoldBulletPattern,
    (
      fullMatch: string,
      indentation: string,
      rawTitle: string
    ) => {
      const title = rawTitle.trim();
      const key = normalizeTitle(title);

      if (ambiguousTitles.has(key)) {
        const locations =
          ambiguous.get(title) ?? new Set<string>();

        locations.add(filePath);

        ambiguous.set(title, locations);

        return fullMatch;
      }

      const matches = articlesByTitle.get(key);

      if (!matches || matches.length !== 1) {
        const locations =
          unmatched.get(title) ?? new Set<string>();

        locations.add(filePath);

        unmatched.set(title, locations);

        return fullMatch;
      }

      const target = matches[0];

      fileLinked += 1;
      totalLinked += 1;

      return `${indentation}- [**${title}**](${target.url})`;
    }
  );

  if (updated !== raw) {
    fs.writeFileSync(filePath, updated, "utf8");
    filesChanged += 1;

    console.log(
      `Updated ${path.relative(process.cwd(), filePath)}: ${fileLinked} link(s)`
    );
  }
}

console.log("");
console.log("Internal-link repair complete.");
console.log(`Articles indexed: ${articles.length}`);
console.log(`Files changed: ${filesChanged}`);
console.log(`Links created: ${totalLinked}`);
console.log(`Unmatched titles: ${unmatched.size}`);
console.log(`Ambiguous titles: ${ambiguous.size}`);

if (unmatched.size > 0) {
  console.log("");
  console.log("UNMATCHED TITLES");

  for (const [title, locations] of unmatched.entries()) {
    console.log(`- ${title}`);

    for (const location of locations) {
      console.log(
        `  ${path.relative(process.cwd(), location)}`
      );
    }
  }
}

if (ambiguous.size > 0) {
  console.log("");
  console.log("AMBIGUOUS TITLES");

  for (const [title, locations] of ambiguous.entries()) {
    console.log(`- ${title}`);

    for (const location of locations) {
      console.log(
        `  ${path.relative(process.cwd(), location)}`
      );
    }
  }
}