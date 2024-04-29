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
            <FormLabel htmlFor={field.name} label="Close Date *" />
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
      <FormikField name="closeTime">
        {({ field, meta }: FieldProps) => (
          <FormGroup>
            <FormLabel htmlFor={field.name} label="Close Time *" />
            <Datepicker
              key={field.name}
              control="time"
              id={field.name}
              value={field.value}
              disabled={isDisabled}
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
