"use client";

import SearchLoading from "./SearchLoading";
import SearchEmpty from "./SearchEmpty";
import SearchResultItem from "./SearchResultItem";

import { useSearch } from "@/hooks/useSearch";

export default function SearchResults() {
  const {
    loading,
    query,
    results,
    selectedIndex,
  } = useSearch();

  if (loading) {
    return <SearchLoading />;
  }

  if (!query) {
    return (
      <div className="p-10 text-center text-gray-500">
        Search articles, authors and categories...
      </div>
    );
  }

  if (results.length === 0) {
    return <SearchEmpty query={query} />;
  }

  return (
    <div className="space-y-3 p-4">
      {results.map((result, index) => (
        <SearchResultItem
          key={result.id}
          result={result}
          active={selectedIndex === index}
        />
      ))}
    </div>
  );
}