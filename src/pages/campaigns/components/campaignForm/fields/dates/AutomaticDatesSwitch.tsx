import { Checkbox } from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useCallback } from "react";
import { NewCampaignValues } from "../../FormProvider";
import { formatDate } from "../../formatDate";

const AutomaticDatesSwitch = () => {
  const { values, setFieldValue } = useFormikContext<NewCampaignValues>();

  const handleChange = useCallback(() => {
    if (!values.automaticDates && values.startDate) {
      const startDate = new Date(values.startDate);
      const endDate = new Date(startDate);
      const closeDate = new Date(startDate);
      // set field value of end date to start date + 7 days
      endDate.setDate(startDate.getDate() + 3);
      setFieldValue("endDate", formatDate(endDate.toISOString()));
      // set field value of close date to start date + 14 days
      closeDate.setDate(startDate.getDate() + 14);
      setFieldValue("closeDate", formatDate(closeDate.toISOString()));
    }
    setFieldValue("automaticDates", !values.automaticDates);
  }, [values.automaticDates, values.startDate, setFieldValue]);

  return (
    <Checkbox
      label="Automatically set end and close dates from start date"
      checked={values.automaticDates}
      onChange={handleChange}
    />
  );
};

export default AutomaticDatesSwitch;
