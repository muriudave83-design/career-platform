export interface ArticleFrontmatter {
  title: string;
  slug: string;
  description: string;
  excerpt: string;

  category: string;

  keywords: string[];

  author: string;

  published: string;

  updated?: string;

  featuredImage: string;

  featured?: boolean;

  draft?: boolean;
}

export interface ArticleHeading {
  id: string;
  text: string;
  level: number;
}

export interface Article {
  frontmatter: ArticleFrontmatter;

  content: string;

  raw: string;

  readingTime: string;

  headings: ArticleHeading[];

  filePath: string;
}