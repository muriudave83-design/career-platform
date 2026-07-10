import { SearchDocument } from "./search";

export interface SearchState {
  open: boolean;
  query: string;
  results: SearchDocument[];
  selectedIndex: number;
  loading: boolean;
}

export interface SearchContextValue extends SearchState {
  openSearch(): void;
  closeSearch(): void;
  setQuery(query: string): void;
  moveUp(): void;
  moveDown(): void;
  select(index: number): void;
  navigate(): void;
}