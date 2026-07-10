import { Article } from "@/types/article";

type Cache = {
  articles: Article[] | null;
  categories: string[] | null;
};

const cache: Cache = {
  articles: null,
  categories: null,
};

export function getCachedArticles() {
  return cache.articles;
}

export function setCachedArticles(
  articles: Article[]
) {
  cache.articles = articles;
}

export function getCachedCategories() {
  return cache.categories;
}

export function setCachedCategories(
  categories: string[]
) {
  cache.categories = categories;
}

export function clearContentCache() {
  cache.articles = null;
  cache.categories = null;
}