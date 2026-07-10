"use client";

import { createContext } from "react";
import { SearchContextValue } from "@/types/search-ui";

export const SearchContext =
  createContext<SearchContextValue | null>(null);