import { MetadataRoute } from "next";
import { articles } from "@/src/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://joinnexiva.com";

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/resources/${article.category}/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: `${baseUrl}/resources/internship-guides`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/resources/cv-writing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/resources/graduate-programs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/resources/interview-preparation`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/resources/career-growth`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: `${baseUrl}/resources/company-insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    ...articleUrls,
  ];
}