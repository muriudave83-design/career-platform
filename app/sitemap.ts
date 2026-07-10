import { MetadataRoute } from "next";

import {
  getArticles,
  getCategories,
} from "@/lib/content";

const BASE_URL = "https://joinnexiva.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const categories = getCategories();

  const categoryUrls = categories.map((category) => ({
    url: `${BASE_URL}/resources/${category}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articleUrls = getArticles().map((article) => ({
    url: `${BASE_URL}/resources/${article.frontmatter.category}/${article.frontmatter.slug}`,
    lastModified: article.frontmatter.updated
      ? new Date(article.frontmatter.updated)
      : new Date(article.frontmatter.published),
    changeFrequency: "weekly" as const,
    priority: article.frontmatter.featured ? 0.9 : 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${BASE_URL}/resources`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },

    ...categoryUrls,

    ...articleUrls,
  ];
}