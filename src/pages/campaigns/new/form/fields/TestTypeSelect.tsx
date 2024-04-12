import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";

import TextInput from "./components/TextInput";

const TestTypeSelect = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();

  return (
    <FormikField name="testType">
      {({ field }: FieldProps) => (
        <TextInput
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
