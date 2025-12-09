import {
  Checkbox,
  FieldProps,
  FormikField,
  FormLabel,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";

const AutoApply = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();

  return (
    <div>
      <FormLabel htmlFor="" label="Auto-apply candidates" />

      <FormikField name="autoApply">
        {({ field }: FieldProps) => (
          <Checkbox
            name={field.name}
            id="autoApply"
            label="Should auto-select candidates once the tester applies?"
            checked={field.value}
            onChange={(e: any) => {
              setFieldValue("autoApply", e.target.checked);
            }}
          />
        )}
      </FormikField>
    </div>
  );
};

export default AutoApply;
