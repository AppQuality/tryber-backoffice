import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";
import { FieldProps, Field as FormikField } from "formik";
import { useMemo } from "react";
import { useGetBrowsersQuery } from "src/services/tryberApi";

const BrowsersMultiselect = () => {
  const { data: browsers } = useGetBrowsersQuery();

  const options = useMemo(
    () =>
      browsers?.results.map((browser) => ({
        value: browser.id.toString(),
        label: browser.name,
      })) || [],
    [browsers]
  );
  return (
    <FormikField name="browsersList">
      {({ field, form }: FieldProps) => (
        <FormGroup>
          <FormLabel htmlFor={field.name} label="Browsers" />
          <Dropdown
            name={field.name}
            id={field.name}
            options={options}
            isMulti
            value={options.filter((o) => field.value.includes(o.value))}
            onChange={(v) => {
              if (!v) return;
              form.setFieldValue(
                field.name,
                v.map((o) => o.value)
              );
            }}
          />
          <ErrorMessage name={field.name} />
        </FormGroup>
      )}
    </FormikField>
  );
};

export default BrowsersMultiselect;
