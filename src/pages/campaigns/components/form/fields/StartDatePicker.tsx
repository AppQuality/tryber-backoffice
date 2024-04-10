import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";

import DateInput from "./components/DateInput";

const StartDatePicker = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();

  return (
    <FormikField name="startDate">
      {({ field }: FieldProps) => (
        <DateInput
          name={field.name}
          label="Start date"
          value={field.value}
          onChange={(value) => setFieldValue(field.name, value)}
        />
      )}
    </FormikField>
  );
};

export default StartDatePicker;
