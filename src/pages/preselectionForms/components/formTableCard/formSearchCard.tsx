import { Input } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import useDebounce from "src/hooks/useDebounce";
import { useAppDispatch } from "src/store";
import { setSearch } from "src/pages/preselectionForms/listSlice";

export const FormSearchCard = () => {
  const dispatch = useAppDispatch();
  const [currentSearch, setCurrentSearch] = useState<string>();
  const debouncedSearch = useDebounce(currentSearch, 1000);

  useEffect(() => {
    dispatch(setSearch(currentSearch));
  }, [debouncedSearch]);

  return (
    <div className="aq-mt-2 aq-mb-3">
      <Input
        placeholder="Search by Form Title, Campaign Id"
        type="search"
        id="search"
        onChange={setCurrentSearch}
      />
    </div>
  );
};
