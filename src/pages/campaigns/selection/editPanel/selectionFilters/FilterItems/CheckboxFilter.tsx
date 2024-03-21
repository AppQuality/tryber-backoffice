import { Checkbox, FormLabel } from "@appquality/appquality-design-system";
import { useAppDispatch } from "src/store";
import { changeTablePage, setFilters } from "../../../selectionSlice";
import { FilterContainer } from "./components/FilterContainer";

const CheckboxFilter = ({
  title,
  key,
  options,
  selected,
  onSelect,
}: {
  title: string;
  key: string;
  options: string[];
  selected?: string[];
  onSelect: (checked: boolean, option: string) => ReturnType<typeof setFilters>;
}) => {
  const dispatch = useAppDispatch();
  return (
    <FilterContainer>
      <FormLabel htmlFor={`filters.${key}`} label={title} />
      {options.map((d) => (
        <div key={d}>
          <Checkbox
            name={`filters.${key}.${d}`}
            label={d}
            checked={selected ? selected.includes(d) : undefined}
            onChange={(e) => {
              dispatch(changeTablePage({ newPage: 1 }));
              dispatch(onSelect(e.target.checked, d));
            }}
          />
        </div>
      ))}
    </FilterContainer>
  );
};

export { CheckboxFilter };
