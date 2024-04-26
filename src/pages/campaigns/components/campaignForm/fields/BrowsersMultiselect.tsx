import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";
import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { useCallback, useMemo } from "react";
import { useGetBrowsersQuery } from "src/services/tryberApi";
import { NewCampaignValues } from "../FormProvider";

const BrowsersMultiselect = () => {
  const fieldName = "browsersList";
  const { data: browsers } = useGetBrowsersQuery();
  const {
    values: { browsersList },
    setFieldValue,
  } = useFormikContext<NewCampaignValues>();

  const options = useMemo(
    () =>
      browsers?.results.map((browser) => ({
        value: browser.id.toString(),
        label: browser.name,
      })) || [],
    [browsers]
  );

  const allOption = useMemo(
    () => ({ value: "all", label: `All Browsers` }),
    []
  );

  const getOptions = () => {
    return [allOption, ...options];
  };

  const getValue = useCallback(() => {
    const values = options.filter(
      (o) => browsersList && browsersList.includes(o.value)
    );
    if (options.length === values.length) return [allOption];
    return values;
  }, [browsersList, options, allOption]);

  const handleChange = useCallback(
    (selectedOptions: Readonly<{ label: string; value: string }[]>) => {
      if (selectedOptions === null || selectedOptions === undefined) {
        setFieldValue(fieldName, []);
        return;
      }
      const currentValue = getValue();

      if (
        !currentValue.some((opt) => opt.value === allOption.value) &&
        selectedOptions.some((opt) => opt.value === allOption.value)
      ) {
        selectedOptions = options;
      }

      selectedOptions = selectedOptions.filter(
        (opt) => opt.value !== allOption.value
      );

      setFieldValue(
        fieldName,
        selectedOptions.map((o) => o.value)
      );
    },
    [setFieldValue, allOption.value, getValue, options]
  );
  return (
    <FormikField name="browsersList">
      {({ field }: FieldProps) => (
        <FormGroup>
          <FormLabel htmlFor={field.name} label="Browsers" />
          <Dropdown
            name={field.name}
            id={field.name}
            options={getOptions()}
            isMulti
            value={getValue()}
            onChange={handleChange}
          />
          <ErrorMessage name={field.name} />
        </FormGroup>
      )}
    </FormikField>
  );
};

export default BrowsersMultiselect;
