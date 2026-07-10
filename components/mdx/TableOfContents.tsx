import Link from "next/link";

import { ArticleHeading } from "@/types/article";

type TableOfContentsProps = {
  headings: ArticleHeading[];
};

export default function TableOfContents({
  headings,
}: TableOfContentsProps) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-gray-900">
        On this page
      </h2>

      <nav>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={
                heading.level === 3
                  ? "ml-4"
                  : ""
              }
            >
              <Link
                href={`#${heading.id}`}
                className="text-gray-600 hover:text-[#00C853] transition-colors"
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}