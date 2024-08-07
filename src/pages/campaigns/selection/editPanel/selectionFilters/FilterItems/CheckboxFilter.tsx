import {
  Checkbox,
  FormLabel,
  Text,
} from "@appquality/appquality-design-system";
import { useMemo } from "react";
import { Ban } from "src/components/icons";
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
        {hasInvalidAnswer && (
          <div className="aq-text-danger aq-mb-1"> Domanda a sbarramento</div>
        )}
        <span>{title}</span>
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
                  {typeof d === "object" && d.isInvalid && (
                    <>
                      <Ban />{" "}
                    </>
                  )}
                  <span>{value}</span>
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
      {hasInvalidAnswer && (
        <Text className="aq-mt-2">
          <small>
            <span className="aq-text-danger">*</span> <Ban /> = Risposta
            escludente
          </small>
        </Text>
      )}
    </FilterContainer>
  );
};

export { CheckboxFilter };
