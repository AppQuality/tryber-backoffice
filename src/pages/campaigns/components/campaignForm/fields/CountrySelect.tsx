import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";
import Select from "./components/Select";
import { Option } from "./components/MultiSelect";
import countries from "i18n-iso-countries";

const CountrySelect = () => {
  const { values, setFieldValue } = useFormikContext<NewCampaignValues>();

  const options: Option[] = [];
  return (
    <div>
      <FormikField name="customerId">
        {({ field }: FieldProps) => (
          <Select
            name={field.name}
            options={options}
            value={field.value}
            label="Country"
            onChange={(value) => {
              setFieldValue(field.name, value);
              setFieldValue("projectId", 0);
            }}
          />
        )}
      </FormikField>
    </div>
  );
};

export default CountrySelect;
