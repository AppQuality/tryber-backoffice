import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";
import TextArea from "./components/Textarea";

const DeviceRequirementsText = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();

  return (
    <FormikField name="deviceRequirements">
      {({ field }: FieldProps) => (
        <TextArea
          name={field.name}
          label="Device Requirements"
          value={field.value}
          onChange={(e) => setFieldValue(field.name, e.currentTarget.value)}
        />
      )}
    </FormikField>
  );
};

export default DeviceRequirementsText;
