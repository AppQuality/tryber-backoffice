import {
  Checkbox,
  FieldProps,
  FormikField,
  FormLabel,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";

const AutoApprove = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();

  return (
    <div>
      <FormLabel htmlFor="autoApprove" label="AI-Powered Bug Approval" />

      <FormikField name="autoApprove">
        {({ field }: FieldProps) => (
          <Checkbox
            name={field.name}
            id="autoApprove"
            label="Enable AI to automatically approve reported bugs"
            checked={field.value}
            onChange={(e: any) => {
              setFieldValue("autoApprove", e.target.checked);
            }}
          />
        )}
      </FormikField>
    </div>
  );
};

export default AutoApprove;
