import { Title, Checkbox } from "@appquality/appquality-design-system";
import InputField from "./InputField";
import { useState } from "react";
import { NewCampaignValues } from "../FormProvider";
import { useFormikContext } from "formik";

const TargetSize = () => {
  const {
    setFieldValue,
    values: { targetCap },
  } = useFormikContext<NewCampaignValues>();
  const [hasCap, setHasCap] = useState(!!targetCap);
  return (
    <>
      <div>
        <Title size="s" className="aq-mb-2">
          Set the target
        </Title>
        <div>
          <InputField
            type="number"
            name="targetSize"
            label="Number of participants"
            style={{ maxWidth: "225px" }}
          />
        </div>
      </div>
      <div>
        <Title size="s" className="q-mb-2">
          Set the maximum candidates capacity
        </Title>

        <Checkbox
          name="checkboxCap"
          id="checkboxCap"
          label="Limit the number of candidates"
          checked={hasCap}
          onChange={(e) => {
            setHasCap(e.target.checked);
            if (!e.target.checked) setFieldValue("targetCap", "");
          }}
        />
        <InputField
          disabled={!hasCap}
          type="number"
          name="targetCap"
          label=""
          style={{ maxWidth: "225px" }}
        />
      </div>
    </>
  );
};

export default TargetSize;
