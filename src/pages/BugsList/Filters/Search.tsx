import { Input } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { useFiltersCardContext } from "../FilterContext";
import useDebounce from "src/hooks/useDebounce";

const Search = () => {
  const { setFilters } = useFiltersCardContext();
  const [currentSearch, setCurrentSearch] = useState<string>();
  const debouncedSearch = useDebounce(currentSearch, 300);

  useEffect(() => {
    setFilters({
      search: currentSearch,
    });
  }, [debouncedSearch]);

  return (
    <>
      <Input
        type="search"
        id="search"
        onChange={setCurrentSearch}
        placeholder="Search by title, tag or id"
      />
    </>
  );
};

export default Search;
