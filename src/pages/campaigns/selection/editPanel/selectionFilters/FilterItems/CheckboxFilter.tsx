import { Checkbox, FormLabel } from "@appquality/appquality-design-system";
import { useAppDispatch } from "src/store";
import { changeTablePage, setFilters } from "../../../selectionSlice";
import { FilterContainer } from "./components/FilterContainer";
import { useMemo } from "react";

const CheckboxFilter = ({
  title,
  key,
  options,
  selected,
  onSelect,
}: {
  title: string;
  key: string;
  options: string[] | CustomQuestionOption[];
  selected?: string[];
  onSelect: (checked: boolean, option: string) => ReturnType<typeof setFilters>;
}) => {
  const dispatch = useAppDispatch();
  const hasInvalidAnswer = useMemo(
    () => options.some((o) => typeof o === "object" && o.isInvalid),
    [options]
  );
  const questionLabel = useMemo(
    () => (
      <>
        <span>{title}</span>
        {hasInvalidAnswer && (
          <small className="aq-text-danger"> (domanda a sbarramento)</small>
        )}
      </>
    ),
    [title, hasInvalidAnswer]
  );

  return (
    <FilterContainer>
      <FormLabel htmlFor={`filters.${key}`} label={questionLabel} />
      {options.map((d) => {
        const value = typeof d === "string" ? d : d.value;
        return (
          <div key={value}>
            <Checkbox
              name={`filters.${key}.${value}`}
              label={
                <>
                  <span>{value}</span>
                  {typeof d === "object" && d.isInvalid && (
                    <small className="aq-text-danger"> (*)</small>
                  )}
                </>
              }
              checked={
                selected ? selected.includes(value.toString()) : undefined
              }
              onChange={(e) => {
                dispatch(changeTablePage({ newPage: 1 }));
                dispatch(onSelect(e.target.checked, value.toString()));
              }}
            />
          </div>
        );
      })}
    </FilterContainer>
  );
};

export { CheckboxFilter };
