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
import { DateTimeFieldWrapper } from "../FieldWrapper";

const EndDatePicker = () => {
  const { setFieldValue, values } = useFormikContext<NewCampaignValues>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue("endDate", e.target.value);
    // if is a new cp, set closeDate to 10 days after the end date
    if (values.isEdit) return;
    const endDate = new Date(e.target.value);
    if (isNaN(endDate.getTime())) return;
    endDate.setDate(endDate.getDate() + 10);
    setFieldValue("closeDate", endDate.toISOString().split("T")[0]);
  };
  const handleTimeChange = useCallback(
    ({ valueText }: { valueText: string }) => {
      setFieldValue("endTime", valueText);
    },
    [setFieldValue]
  );
  return (
    <DateTimeFieldWrapper>
      <FormikField name="endDate">
        {({ field, meta }: FieldProps) => (
          <FormGroup>
            <FormLabel
              htmlFor={field.name}
              label={
                <>
                  <span>End date</span>{" "}
                  <span className="aq-text-danger">*</span>
                </>
              }
            />
            <DateInput
              name={field.name}
              value={field.value}
              onChange={handleChange}
              onBlur={field.onBlur}
            />
            {meta.error && meta.touched && <ErrorMessage name={field.name} />}
          </FormGroup>
        )}
      </FormikField>

      <FormikField name="endTime">
        {({ field, meta }: FieldProps) => (
          <FormGroup>
            <FormLabel
              htmlFor={field.name}
              label={
                <>
                  <span>End time</span>{" "}
                  <span className="aq-text-danger">*</span>
                </>
              }
            />
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
    </DateTimeFieldWrapper>
  );
};

export default EndDatePicker;
