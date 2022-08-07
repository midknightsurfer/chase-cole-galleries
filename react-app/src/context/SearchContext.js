import { createContext, useContext, useState } from "react";

export const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export default function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}