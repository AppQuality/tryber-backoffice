import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";

import Input from "./components/Input";

const CustomerTitleInput = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();

  return (
    <FormikField name="customerTitle">
      {({ field }: FieldProps) => (
        <Input
          name={field.name}
          label="Campaign Title (for customer)"
          value={field.value}
          onChange={(e) => setFieldValue(field.name, e.currentTarget.value)}
        />
      )}
    </FormikField>
  );
};

export default CustomerTitleInput;
