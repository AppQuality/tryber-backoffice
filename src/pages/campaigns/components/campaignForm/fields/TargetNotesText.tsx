import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";
import TextArea from "./components/Textarea";

const TargetNotesText = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();

  return (
    <FormikField name="targetNotes">
      {({ field }: FieldProps) => (
        <TextArea
          name={field.name}
          label="Target Notes"
          value={field.value}
          onChange={(e) => setFieldValue(field.name, e.currentTarget.value)}
        />
      )}
    </FormikField>
  );
};

export default TargetNotesText;
