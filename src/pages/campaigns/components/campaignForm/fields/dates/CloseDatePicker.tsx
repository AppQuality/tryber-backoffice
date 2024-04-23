import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../../FormProvider";

import DateInput from "../components/DateInput";
import { ChangeEvent, useMemo } from "react";

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
      {({ field }: FieldProps) => (
        <DateInput
          disabled={isDisabled}
          name={field.name}
          label="Close date"
          value={field.value}
          onChange={handleChange}
        />
      )}
    </FormikField>
  );
};

export default CloseDatePicker;
