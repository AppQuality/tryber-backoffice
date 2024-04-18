import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";

import { useGetCampaignTypesQuery } from "src/services/tryberApi";
import Select from "./components/Select";

const TestTypeSelect = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const { data: testTypes } = useGetCampaignTypesQuery();

  const options = testTypes
    ? testTypes.map((testType) => ({
        id: testType.id.toString(),
        label: testType.name,
      }))
    : [];

  return (
    <FormikField name="testType">
      {({ field }: FieldProps) => (
        <Select
          options={options}
          name={field.name}
          label="Test Type"
          value={field.value}
          onChange={(value) => setFieldValue(field.name, value)}
        />
      )}
    </FormikField>
  );
};

export default TestTypeSelect;
