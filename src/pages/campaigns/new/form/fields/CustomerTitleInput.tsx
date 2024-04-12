import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";

import TextInput from "./components/TextInput";

const CustomerTitleInput = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();

  return (
    <FormikField name="customerTitle">
      {({ field }: FieldProps) => (
        <TextInput
          name={field.name}
          label="Campaign Title (for customer)"
          value={field.value}
          onChange={(value) => setFieldValue(field.name, value)}
        />
      )}
    </FormikField>
  );
};

export default CustomerTitleInput;
