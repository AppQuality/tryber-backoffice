import {
  Button,
  FormLabel,
  Input,
  Text,
} from "@appquality/appquality-design-system";
import { FieldArray, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;
`;

const AgeRequirements = () => {
  const { values, setFieldValue } = useFormikContext<NewCampaignValues>();
  const ageRanges = values.ageRequirements || [{ min: "", max: "" }];

  const handleChange = (index: number, field: "min" | "max", value: string) => {
    const num = value === "" ? "" : Number(value);
    const updated = [...ageRanges];
    updated[index] = { ...updated[index], [field]: num };
    setFieldValue("ageRequirements", updated);
  };

  return (
    <FieldArray name="ageRequirements">
      {({ remove, push }) => (
        <>
          {ageRanges.map((age, index) => (
            <div key={index}>
              <FormLabel label="" htmlFor={`age-${index}-min`} />
              <Row
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>From</Text>
                <Input
                  id={`age-${index}-min`}
                  type="number"
                  value={age.min === "" ? "" : String(age.min)}
                  onChange={(val) => handleChange(index, "min", val)}
                  placeholder="Min age"
                />
                <Text style={{ fontWeight: "bold" }}>to</Text>
                <Input
                  id={`age-${index}-max`}
                  type="number"
                  value={age.max === "" ? "" : String(age.max)}
                  onChange={(val) => handleChange(index, "max", val)}
                  placeholder="Max age"
                />
                <Button size="sm" kind="danger" onClick={() => remove(index)}>
                  Delete range
                </Button>
              </Row>
            </div>
          ))}
          <Button kind="secondary" onClick={() => push({ min: "", max: "" })}>
            Add age range
          </Button>
        </>
      )}
    </FieldArray>
  );
};

export default AgeRequirements;
