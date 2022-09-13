import { Card, Checkbox, Input } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import useDebounce from "src/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "src/store";
import styled from "styled-components";
import { setSearchBy, setSearch } from "../preselectionListSlice";

const StyledSearchBy = styled.div`
  display: flex;
  margin: 1rem 0.5rem 0 0.5rem;
  max-width: 30rem;
  align-items: center;
  justify-content: space-between;
`;

const searchByConfig: SearchByItem[] = [
  { id: "id", label: "Form Id" },
  { id: "name", label: "Name" },
  { id: "campaignId", label: "Campaign Id" },
];

export const FormSearchCard = () => {
  const dispatch = useAppDispatch();
  const { searchBy } = useAppSelector(
    (state) => state.campaignPreselectionList
  );
  const [currentSearch, setCurrentSearch] = useState<string>();
  const debouncedSearch = useDebounce(currentSearch, 1000);

  const toggleCheckbox = (id: SearchByType) => {
    if (searchBy.indexOf(id) >= 0) {
      const newSearchBy = [...searchBy];
      newSearchBy.splice(newSearchBy.indexOf(id), 1);
      dispatch(setSearchBy(newSearchBy));
    } else {
      dispatch(setSearchBy([...searchBy, id]));
    }
  };

  useEffect(() => {
    dispatch(setSearch(currentSearch));
  }, [debouncedSearch]);

  return (
    <Card className="aq-mt-2 aq-mb-3">
      <Input
        placeholder="Search"
        type="search"
        id="search"
        onChange={setCurrentSearch}
      />
      <StyledSearchBy>
        Search by:
        {searchByConfig.map((s) => {
          const isChecked = searchBy.indexOf(s.id) >= 0;
          return (
            <Checkbox
              key={s.id}
              label={s.label}
              checked={isChecked}
              onChange={() => toggleCheckbox(s.id)}
              disabled={isChecked && searchBy.length < 2}
            />
          );
        })}
      </StyledSearchBy>
    </Card>
  );
};
