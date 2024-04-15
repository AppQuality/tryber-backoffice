import { useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";
import { formatDate } from "../formatDate";
import { useCallback } from "react";

const AutomaticDatesSwitch = () => {
  const { values, setFieldValue } = useFormikContext<NewCampaignValues>();

  const handleChange = useCallback(() => {
    if (!values.automaticDates && values.startDate) {
      const startDate = new Date(values.startDate);
      const endDate = new Date(startDate);
      const closeDate = new Date(startDate);
      // set field value of end date to start date + 7 days
      endDate.setDate(startDate.getDate() + 7);
      setFieldValue("endDate", formatDate(endDate.toUTCString()));
      // set field value of close date to start date + 14 days
      closeDate.setDate(startDate.getDate() + 14);
      setFieldValue("closeDate", formatDate(closeDate.toUTCString()));
    }
    setFieldValue("automaticDates", !values.automaticDates);
  }, [values.automaticDates, values.startDate, setFieldValue]);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={values.automaticDates}
          onChange={handleChange}
        />
        Automatic Dates
      </label>
    </div>
  );
};

export default AutomaticDatesSwitch;
