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

const CloseDatePicker = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldValue("closeDate", e.target.value);
  };
  const handleTimeChange = useCallback(
    ({ valueText }: { valueText: string }) => {
      setFieldValue("closeTime", valueText);
    },
    [setFieldValue]
  );
  return (
    <>
      <FormikField name="closeDate">
        {({ field, meta }: FieldProps) => (
          <FormGroup>
            <FormLabel
              htmlFor={field.name}
              label={
                <>
                  <span>Close date</span>{" "}
                  <span className="aq-text-danger">*</span>
                </>
              }
            />
            <DateInput
              name={field.name}
              value={field.value}
              onChange={handleChange}
            />
            {meta.error && meta.touched && <ErrorMessage name={field.name} />}
          </FormGroup>
        )}
      </FormikField>
      <FormikField name="closeTime">
        {({ field, meta }: FieldProps) => (
          <FormGroup>
            <FormLabel
              htmlFor={field.name}
              label={
                <>
                  <span>Close time</span>{" "}
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
    </>
  );
};

export default CloseDatePicker;
