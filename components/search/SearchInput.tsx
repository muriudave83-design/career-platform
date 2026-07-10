"use client";

import { useSearch } from "@/hooks/useSearch";

export default function SearchInput() {
  const { query, setQuery } =
    useSearch();

  return (
    <div className="border-b border-gray-200 p-5">
      <input
        autoFocus
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        placeholder="Search..."
        className="
          w-full
          bg-transparent
          text-xl
          outline-none
          placeholder:text-gray-400
        "
      />
    </div>
  );
}