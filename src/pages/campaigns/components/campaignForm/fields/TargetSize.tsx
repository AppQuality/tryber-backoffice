import {
  Checkbox,
  FieldProps,
  FormikField,
  Title,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";
import InputField from "./InputField";

const TargetSize = () => {
  const {
    setFieldValue,
    values: { checkboxCap },
  } = useFormikContext<NewCampaignValues>();
  return (
    <>
      <div>
        <Title size="s" className="aq-mb-2">
          Set the target
        </Title>
        <div>
          <InputField
            type="number"
            name="targetSize"
            label="Number of participants"
            style={{ maxWidth: "225px" }}
          />
        </div>
      </div>
      <div>
        <Title size="s" className="q-mb-2">
          Set the maximum candidates capacity
        </Title>

        <FormikField name="checkboxCap">
          {({ field, form }: FieldProps) => (
            <Checkbox
              name={field.name}
              id="checkboxCap"
              label="Limit the number of candidates"
              checked={field.value}
              onChange={(e: any) => {
                setFieldValue("checkboxCap", e.target.checked);
                if (!e.target.checked) setFieldValue("targetCap", "");
              }}
            />
          )}
        </FormikField>
        <InputField
          disabled={!checkboxCap}
          type="number"
          name="targetCap"
          label=""
          style={{ maxWidth: "225px" }}
        />
      </div>
    </>
  );
};

export default TargetSize;
