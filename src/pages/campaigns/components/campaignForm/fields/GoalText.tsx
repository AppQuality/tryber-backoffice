import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";
import TextArea from "./components/Textarea";

const GoalText = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();

  return (
    <FormikField name="goal">
      {({ field }: FieldProps) => (
        <TextArea
          name={field.name}
          label="Goal"
          value={field.value}
          onChange={(e) => setFieldValue(field.name, e.currentTarget.value)}
        />
      )}
    </FormikField>
  );
};

export default GoalText;
