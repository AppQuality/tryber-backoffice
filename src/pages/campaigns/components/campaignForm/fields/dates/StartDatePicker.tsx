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
import { formatDate } from "../../formatDate";

const StartDatePicker = () => {
  const { setFieldValue, values } = useFormikContext<NewCampaignValues>();
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFieldValue("startDate", e.target.value);

      if (!values.automaticDates) return;

      const startDate = new Date(e.target.value);
      const endDate = new Date(startDate);
      const closeDate = new Date(startDate);
      // set field value of end date to start date + 7 days
      endDate.setDate(startDate.getDate() + 7);
      setFieldValue("endDate", formatDate(endDate.toUTCString()));
      // set field value of close date to start date + 14 days
      closeDate.setDate(startDate.getDate() + 14);
      setFieldValue("closeDate", formatDate(closeDate.toUTCString()));
    },
    [setFieldValue, values.automaticDates]
  );
  const handleTimeChange = useCallback(
    ({ valueText }: { valueText: string }) => {
      setFieldValue("startTime", valueText);
      if (!values.automaticDates) return;

      setFieldValue("endTime", valueText);
      setFieldValue("closeTime", valueText);
    },
    [setFieldValue, values.automaticDates]
  );
  return (
    <>
      <FormikField name="startDate">
        {({ field, meta }: FieldProps) => (
          <FormGroup>
            <FormLabel htmlFor={field.name} label="Start Date" />
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
