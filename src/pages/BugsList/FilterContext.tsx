import React, { createContext, useContext, useState } from "react";

type Filters = {
  severities?: number[];
  search?: string;
};
const Context = createContext<{
  filters: Filters;
  setFilters: (filters: Filters) => void;
}>({
  filters: {},
  setFilters: () => {},
});

const FiltersContext = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState({});

  return (
    <Context.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useFiltersCardContext = () => {
  const context = useContext(Context);

  if (!context)
    throw new Error("Provider not found for FlipCardContextProvider");

  return context;
};

export default FiltersContext;
