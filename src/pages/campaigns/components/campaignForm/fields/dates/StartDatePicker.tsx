import {
  DateInput,
  Datepicker,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";
import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { ChangeEvent, useCallback } from "react";
import { NewCampaignValues } from "../../FormProvider";

const StartDatePicker = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFieldValue("startDate", e.target.value);
    },
    [setFieldValue]
  );
  const handleTimeChange = useCallback(
    ({ valueText }: { valueText: string }) => {
      setFieldValue("startTime", valueText);
    },
    [setFieldValue]
  );
  return (
    <>
      <FormikField name="startDate">
        {({ field, meta }: FieldProps) => (
          <FormGroup>
            <FormLabel htmlFor={field.name} label="Start Date *" />
            <DateInput
              name={field.name}
              value={field.value}
              onChange={handleChange}
            />
            {meta.error && meta.touched && <ErrorMessage name={field.name} />}
          </FormGroup>
        )}
      </FormikField>

      <FormikField name="startTime">
        {({ field, meta }: FieldProps) => (
          <FormGroup>
            <FormLabel htmlFor={field.name} label="Start Time *" />
            <Datepicker
              control="time"
              id={field.name}
              value={field.value}
              onChange={handleTimeChange}
            />
            {meta.error && meta.touched && <ErrorMessage name={field.name} />}
          </FormGroup>
        )}
      </FormikField>
    </>
  );
};

export default StartDatePicker;
