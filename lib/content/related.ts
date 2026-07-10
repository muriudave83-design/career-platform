import { Article } from "@/types/article";
import { getArticles } from "./articles";

export function getRelatedArticles(
  article: Article,
  limit = 3
): Article[] {
  return getArticles()
    .filter(
      (candidate) =>
        candidate.frontmatter.slug !==
        article.frontmatter.slug
    )
    .map((candidate) => {
      let score = 0;

      if (
        candidate.frontmatter.category ===
        article.frontmatter.category
      ) {
        score += 10;
      }

      if (candidate.frontmatter.featured) {
        score += 5;
      }

      const sharedKeywords =
        candidate.frontmatter.keywords.filter(
          (keyword) =>
            article.frontmatter.keywords.includes(
              keyword
            )
        ).length;

      score += sharedKeywords * 2;

      if (
        candidate.frontmatter.published >
        article.frontmatter.published
      ) {
        score += 1;
      }

      return {
        candidate,
        score,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.candidate);
}