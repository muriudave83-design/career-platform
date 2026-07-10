import { Metadata } from "next";

import { Article } from "@/types/article";
import { Author } from "@/types/author";

const SITE_URL = "https://joinnexiva.com";

export function buildArticleMetadata(
  article: Article
): Metadata {
  const url = `${SITE_URL}/resources/${article.frontmatter.category}/${article.frontmatter.slug}`;

  return {
    title: `${article.frontmatter.title} | JoinNexiva`,

    description: article.frontmatter.description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      url,
      siteName: "JoinNexiva",
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: article.frontmatter.title,
      description: article.frontmatter.description,
    },
  };
}

export function buildArticleJsonLd(
  article: Article
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: article.frontmatter.title,

    description: article.frontmatter.description,

    datePublished: article.frontmatter.published,

    dateModified:
      article.frontmatter.updated ??
      article.frontmatter.published,

    author: {
      "@type": "Organization",
      name: "JoinNexiva",
    },

    publisher: {
      "@type": "Organization",
      name: "JoinNexiva",
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/resources/${article.frontmatter.category}/${article.frontmatter.slug}`,
    },
  };
}

export function buildAuthorJsonLd(
  author: Author
) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",

    name: author.name,

    description: author.bio,

    jobTitle: author.role,

    url: `${SITE_URL}/authors/${author.slug}`,
  };
}

export function buildBreadcrumbJsonLd(
  items: {
    name: string;
    url: string;
  }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: items.map(
      (item, index) => ({
        "@type": "ListItem",

        position: index + 1,

        name: item.name,

        item: item.url,
      })
    ),
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",

    "@type": "Organization",

    name: "JoinNexiva",

    url: "https://joinnexiva.com",

    logo:
      "https://joinnexiva.com/logo.png",

    sameAs: [
      "https://linkedin.com/company/joinnexiva",
    ],
  };
}