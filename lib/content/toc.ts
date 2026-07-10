import GithubSlugger from "github-slugger";

import { ArticleHeading } from "@/types/article";

const headingPattern = /^(#{2,3})\s+(.+)$/gm;

export function extractHeadings(
  markdown: string
): ArticleHeading[] {
  const slugger = new GithubSlugger();

  const headings: ArticleHeading[] = [];

  let match: RegExpExecArray | null;

  while ((match = headingPattern.exec(markdown)) !== null) {
    headings.push({
      id: slugger.slug(match[2]),

      text: match[2],

      level: match[1].length,
    });
  }

  return headings;
}