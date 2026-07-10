import fs from "fs";
import path from "path";

import matter from "gray-matter";
import readingTime from "reading-time";

import { Article } from "@/types/article";
import { parseFrontmatter } from "./metadata";
import {
  getCachedArticles,
  setCachedArticles,
  getCachedCategories,
  setCachedCategories,
} from "./cache";
import { extractHeadings } from "./toc";

const CONTENT_DIRECTORY = path.join(
  process.cwd(),
  "content",
  "collections"
);

function getCategoryDirectories(): string[] {
  return fs
    .readdirSync(CONTENT_DIRECTORY, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function getArticleFiles(category: string): string[] {
  const categoryPath = path.join(CONTENT_DIRECTORY, category);

  return fs
    .readdirSync(categoryPath)
    .filter((file) => file.endsWith(".mdx"));
}

export function getAllArticlePaths() {
  const categories = getCategoryDirectories();

  return categories.flatMap((category) =>
    getArticleFiles(category).map((file) => ({
      category,
      file,
      fullPath: path.join(CONTENT_DIRECTORY, category, file),
    }))
  );
}

export function loadArticle(
  filePath: string
): Article {
  const raw = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(raw);

  let frontmatter;

  try {
    frontmatter = parseFrontmatter(data);
  } catch (error) {
    console.error("Invalid frontmatter in:", filePath);
    throw error;
  }

  const stats = readingTime(content);

  return {
    frontmatter,

    content,

    raw,

    readingTime: stats.text,

    headings: extractHeadings(content),

    filePath,
  };
}

export function getAllArticles(): Article[] {
  const cached = getCachedArticles();

  if (cached) {
    return cached;
  }

  // During development, allow empty placeholder MDX files without
  // breaking the entire publishing platform. Production builds remain strict.
  const articles = getAllArticlePaths()
    .map((article) => {
      const raw = fs.readFileSync(article.fullPath, "utf8");

      if (!raw.trim()) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            `Skipping empty article: ${article.fullPath}`
          );
          return null;
        }

        throw new Error(
          `Empty article file: ${article.fullPath}`
        );
      }

      return loadArticle(article.fullPath);
    })
    .filter((article): article is Article => article !== null);

  setCachedArticles(articles);

  return articles;
}

export function getCategories(): string[] {
  const cached = getCachedCategories();

  if (cached) {
    return cached;
  }

  const categories = getCategoryDirectories();

  setCachedCategories(categories);

  return categories;
}