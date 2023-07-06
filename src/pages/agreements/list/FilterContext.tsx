import React, { createContext, useContext, useState } from "react";
import useSearchParams from "./useSearchParams";

type Filters = {
  customers?: {
    id?: number;
    name?: string;
  }[];
  search?: string;
};

const DefaultOrder: {
  field: string;
  direction: "ASC" | "DESC";
} = {
  field: "internalId",
  direction: "DESC",
};

const Context = createContext<{
  filters: Filters;
  setFilters: (filters: Filters) => void;
  page: number;
  setPage: (page: number) => void;
  order: typeof DefaultOrder;
  setOrder: (
    field: (typeof DefaultOrder)["field"],
    direction: (typeof DefaultOrder)["direction"]
  ) => void;
}>({
  filters: {},
  setFilters: () => {},
  page: 1,
  setPage: () => {},
  order: DefaultOrder,
  setOrder: () => {},
});

const FiltersContext = ({ children }: { children: React.ReactNode }) => {
  const queryParams = useSearchParams();
  const [filters, setFilters] = useState({});
  const [order, setOrder] = useState<typeof DefaultOrder>(DefaultOrder);
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
        order,
        setOrder: (
          field: (typeof DefaultOrder)["field"],
          direction: (typeof DefaultOrder)["direction"]
        ) => {
          setOrder({ field, direction });
        },
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useFiltersAgreementsContext = () => {
  const context = useContext(Context);

  if (!context)
    throw new Error("Provider not found for FiltersAgreementsContextProvider");

  return context;
};

export default FiltersContext;
