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

const EndDatePicker = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue("endDate", e.target.value);
  };
  const handleTimeChange = useCallback(
    ({ valueText }: { valueText: string }) => {
      setFieldValue("endTime", valueText);
    },
    [setFieldValue]
  );
  return (
    <>
      <FormikField name="endDate">
        {({ field, meta }: FieldProps) => (
          <FormGroup>
            <FormLabel htmlFor={field.name} label="End Date *" />
            <DateInput
              name={field.name}
              value={field.value}
              onChange={handleChange}
            />
            {meta.error && meta.touched && <ErrorMessage name={field.name} />}
          </FormGroup>
        )}
      </FormikField>

      <FormikField name="endTime">
        {({ field, meta }: FieldProps) => (
          <FormGroup>
            <FormLabel htmlFor={field.name} label="End Time *" />
            <Datepicker
              key={field.name}
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

export default EndDatePicker;
