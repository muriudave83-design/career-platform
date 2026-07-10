import { getArticles } from "./articles";

export function getFeaturedArticles() {
  return getArticles().filter(
    (article) => article.frontmatter.featured
  );
}