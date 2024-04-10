import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";

import TextInput from "./components/TextInput";

const TesterTitleInput = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();

  return (
    <FormikField name="testerTitle">
      {({ field }: FieldProps) => (
        <TextInput
          name={field.name}
          label="Campaign Title (for tester)"
          value={field.value}
          onChange={(value) => setFieldValue(field.name, value)}
        />
      )}
    </FormikField>
  );
};

export default TesterTitleInput;
