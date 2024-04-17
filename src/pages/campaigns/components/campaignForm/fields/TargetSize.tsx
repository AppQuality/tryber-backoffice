import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";
import Input from "./components/Input";

const TargetSize = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();

  return (
    <FormikField name="targetSize">
      {({ field }: FieldProps) => (
        <Input
          type="number"
          min={0}
          name={field.name}
          label="Target Size"
          value={field.value}
          onChange={(e) => setFieldValue(field.name, e.currentTarget.value)}
        />
      )}
    </FormikField>
  );
};

export default TargetSize;
