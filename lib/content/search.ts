import {
  getAllArticles,
  getCategories,
} from "./mdx";
import { getAuthors } from "./authors";

import {
  buildArticleDocument,
  buildAuthorDocument,
  buildCategoryDocument,
} from "./searchBuilder";

import { SearchDocument } from "@/types/search";

export function buildSearchIndex(): SearchDocument[] {
  const documents: SearchDocument[] = [];

  for (const article of getAllArticles()) {
    if (!article.frontmatter.draft) {
      documents.push(
        buildArticleDocument(article)
      );
    }
  }

  for (const category of getCategories()) {
    documents.push(
      buildCategoryDocument(category)
    );
  }

  for (const author of getAuthors()) {
    documents.push(
      buildAuthorDocument(author)
    );
  }

  return documents.sort(
    (a, b) => b.score - a.score
  );
}