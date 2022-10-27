import {
  ErrorMessage,
  FormGroup,
  Select,
} from "@appquality/appquality-design-system";
import { Field, FieldProps } from "formik";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import styled from "styled-components";
import { useAppDispatch } from "src/store";
import { setDisableApplyFilters } from "../../../selectionSlice";

const StyledSelect = styled.div`
  flex: 1 1 0px;
  margin-right: 8px;
  div {
    &:first-child {
      margin-bottom: 0;
    }
  }
`;

interface SelectFilterProps {
  name: string;
  options: Option[];
  placeholder?: string;
  index?: number;
}

export const SelectFilter = ({
  name,
  options,
  placeholder,
  index,
}: SelectFilterProps) => {
  const dispatch = useAppDispatch();

  return (
    <StyledSelect>
      <Field
        name={name}
        validate={(v: Option) => {
          if (!v || !v.value) {
            return "This is a required field";
          }
        }}
      >
        {({ field, form }: FieldProps) => {
          // Remove the option from the select if it is selected in another select
          // const newOptions = [...options];
          // if (index !== undefined) {
          //   const selectedValues: string[] = [];
          //   form.values.filters.rows?.forEach(
          //     (r: any, i: number) =>
          //       i !== index && selectedValues.push(r.filterBy.value)
          //   );
          //   selectedValues.forEach((s: any) => {
          //     const index = newOptions.findIndex((o) => o.value === s);
          //     index !== -1 && newOptions.splice(index, 1);
          //   });
          // }
          return (
            <FormGroup>
              <Select
                label=""
                key={name}
                name={name}
                placeholder={placeholder}
                value={field.value}
                // options={newOptions}
                options={options}
                onBlur={() => {
                  form.setFieldTouched(name);
                }}
                onChange={(v) => {
                  if (v === null) {
                    v = { label: "", value: "" };
                  }
                  field.onChange(v.value);
                  form.setFieldValue(name, v, true);
                  dispatch(setDisableApplyFilters(false));
                }}
                isClearable={false}
                menuTargetQuery="body"
                noOptionsMessage={() => "No options"}
              />
              <ErrorMessage name={field.name} />
            </FormGroup>
          );
        }}
      </Field>
    </StyledSelect>
  );
};
