"use client";

import Link from "next/link";

import { SearchDocument } from "@/types/search";

type Props = {
  result: SearchDocument;
  active: boolean;
};

export default function SearchResultItem({
  result,
  active,
}: Props) {
  return (
    <Link
      href={result.url}
      className={`
        block
        rounded-2xl
        border
        p-5
        transition-all

        ${
          active
            ? "border-[#00C853] bg-green-50"
            : "border-transparent hover:border-green-100 hover:bg-gray-50"
        }
      `}
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-[#E8F5E9] px-3 py-1 text-xs font-bold uppercase text-[#00A63E]">
          {result.type}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold text-gray-900">
        {result.title}
      </h3>

      <p className="mt-2 line-clamp-2 text-sm text-gray-600">
        {result.description}
      </p>
    </Link>
  );
}