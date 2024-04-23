import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../../FormProvider";
import { ChangeEvent, useMemo } from "react";
import {
  DateInput,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";

const CloseDatePicker = () => {
  const { values, setFieldValue } = useFormikContext<NewCampaignValues>();
  const isDisabled = useMemo(() => {
    if (values.isEdit) {
      return false;
    }
    if (values.automaticDates) {
      return true;
    }
    return false;
  }, [values.isEdit, values.automaticDates]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue("closeDate", e.target.value);
  };
  return (
    <FormikField name="closeDate">
      {({ field, meta }: FieldProps) => (
        <FormGroup>
          <FormLabel htmlFor={field.name} label="Close Date" />
          <DateInput
            disabled={isDisabled}
            name={field.name}
            value={field.value}
            onChange={handleChange}
          />
          {meta.error && meta.touched && <ErrorMessage name={field.name} />}
        </FormGroup>
      )}
    </FormikField>
  );
};

export default CloseDatePicker;
