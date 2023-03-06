import { useFiltersCardContext } from "../FilterContext";

const Table = () => {
  const value = useFiltersCardContext();
  return <>{JSON.stringify(value.filters)}</>;
};

export default Table;
