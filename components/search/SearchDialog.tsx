"use client";

import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

import { useSearch } from "@/hooks/useSearch";

export default function SearchDialog() {
  const { open, closeSearch } =
    useSearch();

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        bg-black/40
        backdrop-blur-sm
        p-6
      "
      onClick={closeSearch}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className="
          mx-auto
          mt-24
          max-w-3xl
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >
        <SearchInput />

        <SearchResults />
      </div>
    </div>
  );
}