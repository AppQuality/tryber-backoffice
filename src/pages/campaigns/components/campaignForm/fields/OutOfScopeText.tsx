import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";
import TextArea from "./components/Textarea";

const OutOfScopeText = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();

  return (
    <FormikField name="outOfScope">
      {({ field }: FieldProps) => (
        <TextArea
          name={field.name}
          label="Out Of Scope"
          value={field.value}
          onChange={(e) => setFieldValue(field.name, e.currentTarget.value)}
        />
      )}
    </FormikField>
  );
};

export default OutOfScopeText;
