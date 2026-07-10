import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { Author } from "@/types/author";
import { Article } from "@/types/article";
import { getArticles } from "./articles";

const AUTHORS_DIRECTORY = path.join(
  process.cwd(),
  "content",
  "authors"
);

export function getAuthors(): Author[] {
  if (!fs.existsSync(AUTHORS_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(AUTHORS_DIRECTORY)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(
        path.join(AUTHORS_DIRECTORY, file),
        "utf8"
      );

      return matter(raw).data as Author;
    });
}

export function getAuthor(
  slug: string
): Author | null {
  return (
    getAuthors().find(
      (author) => author.slug === slug
    ) ?? null
  );
}

export function getArticlesByAuthor(
  slug: string
): Article[] {
  return getArticles().filter(
    (article) =>
      article.frontmatter.author === slug
  );
}