import { ArticleFrontmatter } from "@/types/article";

const REQUIRED_FIELDS = [
  "title",
  "slug",
  "description",
  "excerpt",
  "category",
  "keywords",
  "author",
  "published",
  "featuredImage",
] as const;

export function parseFrontmatter(
  data: unknown
): ArticleFrontmatter {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid frontmatter.");
  }

  const frontmatter = data as Record<string, unknown>;

  // Validate that required fields exist, regardless of their value.
  for (const field of REQUIRED_FIELDS) {
    if (!(field in frontmatter)) {
      throw new Error(
        `Missing required frontmatter field: ${field}`
      );
    }
  }

  return {
    title: String(frontmatter.title),

    slug: String(frontmatter.slug),

    description: String(frontmatter.description),

    excerpt: String(frontmatter.excerpt),

    category: String(frontmatter.category),

    keywords: Array.isArray(frontmatter.keywords)
      ? frontmatter.keywords.map(String)
      : [],

    author: String(frontmatter.author),

    published: String(frontmatter.published),

    updated:
      "updated" in frontmatter &&
      frontmatter.updated != null
        ? String(frontmatter.updated)
        : undefined,

    featuredImage: String(frontmatter.featuredImage),

    featured: Boolean(frontmatter.featured),

    draft: Boolean(frontmatter.draft),
  };
}