import {
  ErrorMessage,
  FormGroup,
  Select,
} from "@appquality/appquality-design-system";
import { Field, FieldProps } from "formik";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import styled from "styled-components";

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
}

export const SelectFilter = ({
  name,
  options,
  placeholder,
}: SelectFilterProps) => {
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
          return (
            <FormGroup>
              <Select
                label=""
                key={name}
                name={name}
                placeholder={placeholder}
                value={field.value}
                options={options}
                onChange={(v) => {
                  if (v === null) {
                    v = { label: "", value: "" };
                  }
                  field.onChange(v.value);
                  form.setFieldValue(name, v, true);
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
