import { SearchDocument } from "@/types/search";
import { Article } from "@/types/article";
import { Author } from "@/types/author";
import { tokenize } from "./tokenizer";

export function buildArticleDocument(
  article: Article
): SearchDocument {
  const keywords = [
    ...article.frontmatter.keywords,
    ...tokenize(article.frontmatter.title),
    ...tokenize(article.frontmatter.description),
  ];

  return {
    id: article.frontmatter.slug,

    type: "article",

    title: article.frontmatter.title,

    description: article.frontmatter.description,

    excerpt:
      article.frontmatter.excerpt ??
      article.frontmatter.description,

    url: `/resources/${article.frontmatter.category}/${article.frontmatter.slug}`,

    keywords: [...new Set(keywords)],

    score: article.frontmatter.featured ? 100 : 50,

    category: article.frontmatter.category,

    author: article.frontmatter.author,

    published: article.frontmatter.published,
  };
}

export function buildCategoryDocument(
  category: string
): SearchDocument {
  return {
    id: category,

    type: "category",

    title: category.replace(/-/g, " "),

    description: `${category.replace(/-/g, " ")} resources`,

    excerpt: "",

    url: `/resources/${category}`,

    keywords: category.split("-"),

    score: 25,
  };
}

export function buildAuthorDocument(
  author: Author
): SearchDocument {
  return {
    id: author.slug,

    type: "author",

    title: author.name,

    description: author.bio,

    excerpt: author.bio,

    url: `/authors/${author.slug}`,

    keywords: [],

    score: 30,

    author: author.slug,
  };
}