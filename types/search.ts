export type SearchDocumentType =
  | "article"
  | "category"
  | "author";

export interface SearchDocument {
  id: string;

  type: SearchDocumentType;

  title: string;

  description: string;

  excerpt: string;

  url: string;

  keywords: string[];

  score: number;

  category?: string;

  author?: string;

  published?: string;
}