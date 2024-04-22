import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";
import countries from "i18n-iso-countries";
import { useMemo } from "react";
import {
  ErrorMessage,
  Dropdown,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";

interface Option {
  label: string;
  value: string;
}
const CountrySelect = () => {
  const countriesOptions = useMemo(() => {
    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    const enCountries = countries.getNames("en");
    return Object.entries(enCountries).map(([id, label]) => ({
      id: id,
      value: id,
      label,
    }));
  }, []);

  return (
    <FormikField name="countries">
      {({ field, form }: FieldProps<NewCampaignValues["countries"]>) => (
        <FormGroup>
          <FormLabel htmlFor={field.name} label="Countries" />
          <Dropdown
            placeholder=""
            data-qa="country-select"
            isMulti
            name={field.name}
            id={field.name}
            options={countriesOptions}
            value={countriesOptions.filter((o) =>
              field.value.includes(o.value)
            )}
            onChange={(v) => {
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

export default CountrySelect;
