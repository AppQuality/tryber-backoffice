import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../../FormProvider";

import Input from "../components/Input";
import { ChangeEvent, useMemo } from "react";

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
  return (
    <FormikField name="endDate">
      {({ field }: FieldProps) => (
        <Input
          type="date"
          disabled={isDisabled}
          name={field.name}
          label="End date"
          value={field.value}
          onChange={handleChange}
        />
      )}
    </FormikField>
  );
};

export default EndDatePicker;
