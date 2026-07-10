export interface SEOData {
  title: string;

  description: string;

  canonical: string;

  image: string;

  keywords: string[];

  published: string;

  updated?: string;

  author: string;

  type: "article" | "website";
}