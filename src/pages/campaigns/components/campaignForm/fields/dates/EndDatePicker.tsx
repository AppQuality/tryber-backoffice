import {
  DateInput,
  Datepicker,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";
import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { ChangeEvent, useCallback, useMemo } from "react";
import { NewCampaignValues } from "../../FormProvider";

const EndDatePicker = () => {
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
            <FormLabel htmlFor={field.name} label="End Date" />
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

      <FormikField name="endTime">
        {({ field, meta }: FieldProps) => (
          <FormGroup>
            <Datepicker
              key={field.value}
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
