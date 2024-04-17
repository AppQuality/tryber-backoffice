import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";
import Multiselect, { Option } from "./components/MultiSelect";
import countries from "i18n-iso-countries";
import { useMemo } from "react";

const CountrySelect = () => {
  const { values, setFieldValue } = useFormikContext<NewCampaignValues>();

  const options: Option[] = useMemo(() => {
    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    const enCountries = countries.getNames("en");
    return Object.entries(enCountries).map(([id, label]) => ({
      id,
      label,
    }));
  }, []);

  return (
    <div>
      <FormikField name="countries">
        {({ field }: FieldProps) => (
          <Multiselect
            name={field.name}
            options={options}
            value={field.value}
            label="Country"
            onChange={(e) => {
              if (!e.currentTarget.value) setFieldValue(field.name, []);
              if (values.countries.includes(e.currentTarget.value)) {
                setFieldValue(
                  field.name,
                  values.countries.filter(
                    (country) => country !== e.currentTarget.value
                  )
                );
                return;
              }
              setFieldValue(field.name, [
                ...values.countries,
                e.currentTarget.value,
              ]);
            }}
          />
        )}
      </FormikField>
    </div>
  );
};

export default CountrySelect;
