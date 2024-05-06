import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";
import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import countryList from "i18n-iso-countries";
import { useCallback, useMemo } from "react";
import { NewCampaignValues } from "../FormProvider";

const CountrySelect = () => {
  const fieldName = "countries";
  const {
    values: { countries },
    setFieldValue,
  } = useFormikContext<NewCampaignValues>();

  const options = useMemo(() => {
    countryList.registerLocale(require("i18n-iso-countries/langs/en.json"));
    const enCountries = countryList.getNames("en");
    return Object.entries(enCountries).map(([id, label]) => ({
      id: id,
      value: id,
      label,
    }));
  }, []);

  const allOption = useMemo(
    () => ({ value: "all", label: `All Countries` }),
    []
  );
  const getOptions = () => {
    return [allOption, ...options];
  };

  const getValue = useCallback(() => {
    const values = options.filter(
      (o) => countries && countries.includes(o.value)
    );
    if (options.length === values.length) return [allOption];
    return values;
  }, [countries, options, allOption]);

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
    <FormikField name="countries">
      {({ field }: FieldProps<NewCampaignValues["countries"]>) => (
        <FormGroup>
          <FormLabel htmlFor={field.name} label="Countries" />
          <Dropdown
            isMulti
            name={field.name}
            id={field.name}
            options={getOptions()}
            value={getValue()}
            onChange={handleChange}
          />
          <ErrorMessage name={field.name} />
        </FormGroup>
      )}
    </FormikField>
  );
};

export default CountrySelect;
