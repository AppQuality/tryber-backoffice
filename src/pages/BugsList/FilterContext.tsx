import React, { createContext, useContext, useState } from "react";

type Filters = {
  severities?: number[];
  status?: number[];
  search?: string;
};
const Context = createContext<{
  filters: Filters;
  setFilters: (filters: Filters) => void;
  page: number;
  setPage: (page: number) => void;
}>({
  filters: {},
  setFilters: () => {},
  page: 1,
  setPage: () => {},
});

const FiltersContext = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  return (
    <Context.Provider
      value={{
        filters,
        setFilters: (newFilters: Filters) => {
          setFilters({ ...filters, ...newFilters });
          setPage(1);
        },
        page,
        setPage,
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
