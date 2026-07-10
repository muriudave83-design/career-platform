import { Article } from "@/types/article";

import {
  getAllArticles,
  getAllArticlePaths,
  loadArticle,
} from "./mdx";

export function getArticles(): Article[] {
  return getAllArticles();
}

export function getArticle(
  category: string,
  slug: string
): Article | null {
  const articlePath = getAllArticlePaths().find((article) => {
    const fileSlug = article.file.replace(/\.mdx$/, "");

    return (
      article.category === category &&
      fileSlug === slug
    );
  });

  if (!articlePath) {
    return null;
  }

  return loadArticle(articlePath.fullPath);
}

export function getArticlesByCategory(
  category: string
): Article[] {
  return getArticles().filter(
    (article) =>
      article.frontmatter.category === category
  );
}