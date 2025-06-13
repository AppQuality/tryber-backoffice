import {
  Button,
  ErrorMessage,
  Input,
  Text,
} from "@appquality/appquality-design-system";
import {
  Field as FormikField,
  FieldArray,
  FieldProps,
  useFormikContext,
} from "formik";
import { ReactComponent as DeleteIcon } from "src/assets/trash.svg";
import styled from "styled-components";
import { NewCampaignValues } from "../FormProvider";

const StyledRow = styled.div`
  .container {
    display: flex;
    gap: ${({ theme }) => theme.grid.sizes[4]};
    align-items: center;
    flex-direction: row;
  }
  margin-bottom: ${({ theme }) => theme.grid.sizes[3]};
`;

const AgeRequirements = () => {
  const { values, errors, touched } = useFormikContext<NewCampaignValues>();
  const ageRanges: NonNullable<NewCampaignValues["ageRequirements"]> =
    values.ageRequirements || [];

  return (
    <FieldArray name="ageRequirements">
      {({ remove, push }) => (
        <>
          {ageRanges.map((age, index) => (
            <StyledRow key={index}>
              <div className="container">
                <FormikField name={`ageRequirements[${index}].min`}>
                  {({ form, field }: FieldProps) => (
                    <>
                      <Text style={{ fontWeight: "bold" }}>From</Text>
                      <Input
                        id={field.name}
                        type="number"
                        extra={{
                          max: age.max || undefined,
                          onBlur: () => form.setFieldTouched(field.name),
                        }}
                        value={field.value || ""}
                        onChange={(val) => form.setFieldValue(field.name, val)}
                        placeholder="Min"
                      />
                    </>
                  )}
                </FormikField>
                <FormikField name={`ageRequirements[${index}].max`}>
                  {({ form, field }: FieldProps) => (
                    <>
                      <Text style={{ fontWeight: "bold" }}>to</Text>
                      <Input
                        id={field.name}
                        type="number"
                        extra={{
                          min: age.min || undefined,
                          onBlur: () => form.setFieldTouched(field.name),
                        }}
                        value={field.value || ""}
                        onChange={(val) => form.setFieldValue(field.name, val)}
                        placeholder="Max"
                      />
                    </>
                  )}
                </FormikField>
                <Button size="sm" kind="danger" onClick={() => remove(index)}>
                  <DeleteIcon />
                </Button>
              </div>
              <div>
                <ErrorMessage name={`ageRequirements[${index}].min`} />
                <ErrorMessage name={`ageRequirements[${index}].max`} />
              </div>
            </StyledRow>
          ))}
          <Button
            size="sm"
            kind="secondary"
            onClick={() => push({ min: "", max: "" })}
          >
            + Add age range
          </Button>
        </>
      )}
    </FieldArray>
  );
};

export default AgeRequirements;
