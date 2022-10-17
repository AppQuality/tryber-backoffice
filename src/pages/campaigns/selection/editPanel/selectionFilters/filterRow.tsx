import { Input, Select } from "@appquality/appquality-design-system";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Trash } from "./assets/trash.svg";

const StyledFilterRow = styled.div`
  display: flex;
  margin-bottom: 8px;

  .search {
    flex: 1 1 20px;
    margin-right: 8px;
  }
  .filter-trash {
    cursor: pointer;
  }
`;

const StyledSelect = styled.div`
  flex: 1 1 0px;
  margin-right: 8px;
`;

const queryTypeOptions: Option[] = [
  { label: "Include", value: "filteByInclude" },
  { label: "Exclude", value: "filterByExclude" },
];

interface FilterRowProps {
  filterByOptions: Option[];
  onRemove: () => void;
}

const FilterRow = ({ filterByOptions, onRemove }: FilterRowProps) => {
  const [filterBy, setFilterBy] = useState<Option>({ label: "", value: "" });
  const [queryType, setQueryType] = useState(queryTypeOptions[0]);
  const [search, setSearch] = useState("");

  return (
    <StyledFilterRow>
      <StyledSelect>
        <Select
          label=""
          name="select-filter-by"
          placeholder="Filter by"
          value={filterBy}
          options={filterByOptions}
          onChange={(v) => setFilterBy(v)}
          isClearable={false}
          menuTargetQuery="body"
          noOptionsMessage={() => "No options"}
        />
      </StyledSelect>
      <StyledSelect>
        <Select
          label=""
          name="select-query-type"
          value={queryType}
          options={queryTypeOptions}
          onChange={(v) => setQueryType(v)}
          isClearable={false}
          menuTargetQuery="body"
          noOptionsMessage={() => "No options"}
        />
      </StyledSelect>
      <Input
        id="text-search"
        type="text"
        className="search"
        placeholder="Search"
        value={search}
        onChange={(v) => setSearch(v)}
      />
      <Trash className="filter-trash" onClick={onRemove} />
    </StyledFilterRow>
  );
};

export default FilterRow;
