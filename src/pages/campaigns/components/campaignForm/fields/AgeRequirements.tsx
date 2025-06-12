import {
  FormikField,
  FormLabel,
  Input,
  Text,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;
`;

const AgeRequirements = () => {
  const { values, setFieldValue } = useFormikContext<NewCampaignValues>();
  const age =
    values.ageRequirements && values.ageRequirements[0]
      ? values.ageRequirements[0]
      : { min: "", max: "" };

  const handleChange = (field: "min" | "max", value: string) => {
    const num = value === "" ? "" : Number(value);
    setFieldValue("ageRequirements", [{ ...age, [field]: num }]);
  };

  return (
    <FormikField name="ageRequirements">
      {() => (
        <div>
          <FormLabel label="" htmlFor="age-min" />
          <Row
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>From</Text>
            <Input
              id="age-min"
              type="number"
              value={age.min === "" ? "" : String(age.min)}
              onChange={(val) => handleChange("min", val)}
              placeholder="Min age"
            />
            <Text style={{ fontWeight: "bold" }}>to</Text>
            <Input
              id="age-max"
              type="number"
              value={age.max === "" ? "" : String(age.max)}
              onChange={(val) => handleChange("max", val)}
              placeholder="Max age"
            />
          </Row>
        </div>
      )}
    </FormikField>
  );
};

export default AgeRequirements;
