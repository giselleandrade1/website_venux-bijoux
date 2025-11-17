"use client";
import React, { createContext, useContext, useState } from "react";

type SearchContextValue = {
  q: string;
  setQ: (s: string) => void;
};

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [q, setQ] = useState("");
  return (
    <SearchContext.Provider value={{ q, setQ }}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
