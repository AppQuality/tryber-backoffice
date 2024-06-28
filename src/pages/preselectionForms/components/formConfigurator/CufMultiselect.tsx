import {
  Select,
  FormGroup,
  ErrorMessage,
} from "@appquality/appquality-design-system";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { Field, FieldProps } from "formik";
import { useMemo } from "react";

const optionAll = [{ label: "All options", value: "-1" }];

export const CufMultiselect = ({
  label,
  options,
  name,
}: {
  label: string;
  options: Option[];
  name: string;
}) => {
  const selectOptions = useMemo(
    () =>
      options.map((option) => ({
        label: option.label,
        value: option.value,
      })),
    [options]
  );
  return (
    <div className="aq-mb-3">
      <Field
        name={name}
        validate={(value: string) => {
          if (!value || !value.length) {
            return "This is a required field";
          }
        }}
      >
        {({
          field, // { name, value, onChange, onBlur }
          form,
        }: FieldProps) => {
          return (
            <FormGroup>
              <Select
                key={name}
                name={name}
                value={field.value || []}
                options={
                  field.value?.some((v: any) => v.value === "-1")
                    ? optionAll
                    : [...optionAll, ...selectOptions]
                }
                onBlur={() => {
                  form.setFieldTouched(name);
                }}
                label={label}
                placeholder={"Select options"}
                menuTargetQuery="body"
                noOptionsMessage={() => "No options"}
                onChange={(v) => {
                  if (v === null) {
                    v = { label: "", value: "" };
                  }
                  form.setFieldValue(field.name, v, true);
                  if (v?.some((v: any) => v.value === "-1"))
                    form.setFieldValue(field.name, optionAll, true);
                }}
                isMulti
              />
              <ErrorMessage name={name} />
            </FormGroup>
          );
        }}
      </Field>
    </div>
  );
};
