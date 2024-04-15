import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";

import DateInput from "./components/DateInput";
import { formatDate } from "../formatDate";
import { ChangeEvent, useCallback } from "react";

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
  return (
    <FormikField name="startDate">
      {({ field }: FieldProps) => (
        <DateInput
          name={field.name}
          label="Start date"
          value={field.value}
          onChange={handleChange}
        />
      )}
    </FormikField>
  );
};

export default StartDatePicker;
