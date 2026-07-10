"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { SearchContext } from "@/contexts/SearchContext";
import { SearchDocument } from "@/types/search";
import { SearchContextValue } from "@/types/search-ui";

type Props = {
  children: React.ReactNode;
};

export default function SearchProvider({
  children,
}: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [query, setQuery] = useState("");

  const [documents, setDocuments] = useState<
    SearchDocument[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          "/search-index.json"
        );

        const json =
          (await response.json()) as SearchDocument[];

        setDocuments(json);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const q = query.toLowerCase();

    return documents
      .filter((doc) => {
        return (
          doc.title.toLowerCase().includes(q) ||
          doc.description
            .toLowerCase()
            .includes(q) ||
          doc.keywords.some((k) =>
            k.toLowerCase().includes(q)
          )
        );
      })
      .slice(0, 10);
  }, [documents, query]);

  const openSearch = useCallback(() => {
    setOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const moveDown = useCallback(() => {
    setSelectedIndex((value) =>
      Math.min(value + 1, results.length - 1)
    );
  }, [results.length]);

  const moveUp = useCallback(() => {
    setSelectedIndex((value) =>
      Math.max(value - 1, 0)
    );
  }, []);

  const navigate = useCallback(() => {
    const result = results[selectedIndex];

    if (!result) {
      return;
    }

    router.push(result.url);

    setOpen(false);

    setQuery("");

    setSelectedIndex(0);
  }, [results, selectedIndex, router]);

  useEffect(() => {
    function onKeyDown(
      event: KeyboardEvent
    ) {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        setOpen(true);

        return;
      }

      if (!open) {
        return;
      }

      switch (event.key) {
        case "Escape":
          event.preventDefault();
          closeSearch();
          break;

        case "ArrowDown":
          event.preventDefault();
          moveDown();
          break;

        case "ArrowUp":
          event.preventDefault();
          moveUp();
          break;

        case "Enter":
          event.preventDefault();
          navigate();
          break;
      }
    }

    window.addEventListener(
      "keydown",
      onKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        onKeyDown
      );
  }, [
    open,
    closeSearch,
    moveDown,
    moveUp,
    navigate,
  ]);

  const value: SearchContextValue = {
    open,
    query,
    results,
    loading,
    selectedIndex,

    openSearch,
    closeSearch,

    setQuery,

    moveUp,
    moveDown,

    select: setSelectedIndex,

    navigate,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}