import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import styled from "styled-components";
import { ReactComponent as Trash } from "./assets/trash.svg";
import { InputFilter } from "./InputFilter";
import { SelectFilter } from "./SelectFilter";
import { FieldArray } from "formik";

const StyledFilterRow = styled.div`
  display: flex;
  margin-bottom: 8px;

  .filter-trash {
    cursor: pointer;
  }
`;

interface FilterRowProps {
  index: number;
  filterByOptions: Option[];
  queryTypeOptions: Option[];
}

const FilterRow = ({
  index,
  filterByOptions,
  queryTypeOptions,
}: FilterRowProps) => {
  return (
    <StyledFilterRow>
      <SelectFilter
        name={`filters.row.${index}.filterBy`}
        options={filterByOptions}
        placeholder={"Filter by"}
      />
      <SelectFilter
        name={`filters.row.${index}.queryType`}
        options={queryTypeOptions}
      />
      <InputFilter
        name={`filters.row.${index}.search`}
        placeholder={"Search"}
      />
      <FieldArray
        name="filters.row"
        render={(arrayHelpers) => (
          <Trash
            className="filter-trash"
            onClick={() => arrayHelpers.remove(index)}
          />
        )}
      />
    </StyledFilterRow>
  );
};

export default FilterRow;
