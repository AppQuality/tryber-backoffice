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
      <FormLabel htmlFor="autoApprove" label="Auto-approve Bugs" />

      <FormikField name="autoApprove">
        {({ field }: FieldProps) => (
          <Checkbox
            name={field.name}
            id="autoApprove"
            label="Should AI agent auto-approve bugs once they are reported?"
            checked={field.value}
            onChange={(e) => {
              setFieldValue("autoApprove", e.target.checked);
            }}
          />
        )}
      </FormikField>
    </div>
  );
};

export default AutoApprove;
