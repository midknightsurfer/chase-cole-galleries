import { createContext, useState, useContext } from "react";

export const CategoryContext = createContext();

export const useCategory = () => useContext(CategoryContext);

export default function CategoryProvider({ children }) {
  const [category, setCategory] = useState(0);

  return (
    <CategoryContext.Provider
      value={{
        category,
        setCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}