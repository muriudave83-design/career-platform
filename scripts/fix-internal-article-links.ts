import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(
  process.cwd(),
  "content",
  "collections"
);

const APPLY_CHANGES = process.argv.includes("--apply");

const EXPLICIT_ALIASES: Record<string, string> = {
  "how to write a graduate cover letter":
    "/resources/graduate-programs/graduate-programme-cover-letter-guide-kenya-2026",

  "complete interview preparation guide":
    "/resources/graduate-programs/graduate-programme-interview-questions-kenya-2026",

  "star interview method":
    "/resources/interview-preparation/mastering-the-star-interview-method-kenya-2026",

  "salary expectations interview guide":
    "/resources/interview-preparation/salary-expectations-interview-kenya-2026",

  "how to turn an internship into a full-time job":
    "/resources/internship-guides/turning-an-internship-into-a-full-time-job-kenya-2026",

  "tell me about yourself":
    "/resources/interview-preparation/tell-me-about-yourself-interview-kenya-2026",
};

type Article = {
  title: string;
  slug: string;
  category: string;
  filePath: string;
  url: string;
};

function getMdxFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(
    (entry) => {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return getMdxFiles(fullPath);
      }

      return entry.isFile() && entry.name.endsWith(".mdx")
        ? [fullPath]
        : [];
    }
  );
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[“”"'`]/g, "")
    .replace(/&/g, "and")
    .replace(/\b2026\b/g, "")
    .replace(/\bprogramme\b/g, "program")
    .replace(/\bprogrammes\b/g, "program")
    .replace(/\bprograms\b/g, "program")
    .replace(/\bguide to\b/g, "guide")
    .replace(/\bin kenya\b/g, "kenya")
    .replace(/\bfor kenya\b/g, "kenya")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugWords(slug: string): string {
  return normalize(slug.replace(/-/g, " "));
}

function similarity(a: string, b: string): number {
  const aWords = new Set(
    normalize(a).split(" ").filter(Boolean)
  );

  const bWords = new Set(
    normalize(b).split(" ").filter(Boolean)
  );

  if (!aWords.size || !bWords.size) {
    return 0;
  }

  let intersection = 0;

  for (const word of aWords) {
    if (bWords.has(word)) {
      intersection++;
    }
  }

  return (
    (2 * intersection) /
    (aWords.size + bWords.size)
  );
}

const files = getMdxFiles(CONTENT_ROOT);

const articles: Article[] = [];

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

function isContinueLearningHeading(line: string): boolean {
  return /^#{1,6}\s+continue learning\s*$/i.test(
    line.trim()
  );
}

function getBareArticleBullet(
  line: string
): string | null {
  const match = line.match(
    /^\s*-\s+\*\*(.+?)\*\*\s*$/
  );

  if (!match) {
    return null;
  }

  const title = match[1].trim();

  if (
    title.startsWith("[") ||
    /]\([^)]+\)/.test(title)
  ) {
    return null;
  }

  return title;
}

function resolveReference(label: string) {
  const normalizedLabel = normalize(label);

  const explicitAlias =
    EXPLICIT_ALIASES[normalizedLabel];

  if (explicitAlias) {
    const article = articles.find(
      (candidate) =>
        candidate.url === explicitAlias
    );

    if (article) {
      return {
        status: "safe" as const,
        method: "explicit-alias",
        article,
        score: 1,
      };
    }
  }

  const titleMatches = articles.filter(
    (article) =>
      normalize(article.title) === normalizedLabel
  );

  if (titleMatches.length === 1) {
    return {
      status: "safe" as const,
      method: "title",
      article: titleMatches[0],
      score: 1,
    };
  }

  const slugMatches = articles.filter(
    (article) =>
      slugWords(article.slug) === normalizedLabel
  );

  if (slugMatches.length === 1) {
    return {
      status: "safe" as const,
      method: "slug",
      article: slugMatches[0],
      score: 1,
    };
  }

  const candidates = articles
    .map((article) => ({
      article,
      score: Math.max(
        similarity(label, article.title),
        similarity(
          label,
          slugWords(article.slug)
        )
      ),
    }))
    .sort((a, b) => b.score - a.score);

  const best = candidates[0];
  const second = candidates[1];

  if (
    best &&
    best.score >= 0.82 &&
    (!second ||
      best.score - second.score >= 0.12)
  ) {
    return {
      status: "safe" as const,
      method: "similarity",
      article: best.article,
      score: best.score,
    };
  }

  return {
    status: "unresolved" as const,
    candidates: candidates.slice(0, 3),
  };
}

let sectionsFound = 0;
let existingLinks = 0;
let bareReferences = 0;
let safeMatches = 0;
let unresolvedMatches = 0;
let filesChanged = 0;
let linksApplied = 0;

for (const filePath of files) {
  const raw = fs.readFileSync(filePath, "utf8");
  const lines = raw.split(/\r?\n/);

  let insideContinueLearning = false;
  let continueHeadingLevel = 0;
  let changed = false;

  const updatedLines = lines.map((line) => {
    const headingMatch = line.match(
      /^(#{1,6})\s+(.+)$/
    );

    if (headingMatch) {
      const level = headingMatch[1].length;

      if (isContinueLearningHeading(line)) {
        insideContinueLearning = true;
        continueHeadingLevel = level;
        sectionsFound++;

        return line;
      }

      if (
        insideContinueLearning &&
        level <= continueHeadingLevel
      ) {
        insideContinueLearning = false;
      }
    }

    if (!insideContinueLearning) {
      return line;
    }

    if (
      /^\s*-\s+\[.+\]\([^)]+\)\s*$/.test(line)
    ) {
      existingLinks++;
      return line;
    }

    if (
      /^\s*-\s+\[\*\*.+\*\*\]\([^)]+\)\s*$/.test(
        line
      )
    ) {
      existingLinks++;
      return line;
    }

    const label = getBareArticleBullet(line);

    if (!label) {
      return line;
    }

    bareReferences++;

    const result = resolveReference(label);

    if (result.status !== "safe") {
      unresolvedMatches++;
      return line;
    }

    safeMatches++;

    if (!APPLY_CHANGES) {
      return line;
    }

    const indentation =
      line.match(/^(\s*)/)?.[1] ?? "";

    changed = true;
    linksApplied++;

    return `${indentation}- [**${label}**](${result.article.url})`;
  });

  if (APPLY_CHANGES && changed) {
    fs.writeFileSync(
      filePath,
      updatedLines.join("\n"),
      "utf8"
    );

    filesChanged++;
  }
}

console.log("");

console.log(
  APPLY_CHANGES
    ? "CONTINUE LEARNING LINK REPAIR — APPLY MODE"
    : "CONTINUE LEARNING LINK AUDIT"
);

console.log("");

console.log(
  `Articles indexed: ${articles.length}`
);

console.log(
  `Continue Learning sections: ${sectionsFound}`
);

console.log(
  `Existing links: ${existingLinks}`
);

console.log(
  `Bare references: ${bareReferences}`
);

console.log(
  `Safe matches: ${safeMatches}`
);

console.log(
  `Unresolved: ${unresolvedMatches}`
);

if (APPLY_CHANGES) {
  console.log(
    `Files changed: ${filesChanged}`
  );

  console.log(
    `Links applied: ${linksApplied}`
  );
} else {
  console.log("");
  console.log(
    "AUDIT ONLY — NO FILES MODIFIED"
  );
}