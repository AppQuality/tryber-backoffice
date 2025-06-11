import {
  FormikField,
  FormLabel,
  Checkbox,
} from "@appquality/appquality-design-system";
import { FieldProps } from "formik";
import { NewCampaignValues } from "../FormProvider";
import styled from "styled-components";

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-conforming", label: "Non conforming" },
  { value: "prefer-not-to-answer", label: "Prefer not to answer" },
];

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const GenderRequirements = () => (
  <FormikField name="genderRequirements">
    {({ field, form }: FieldProps<NewCampaignValues["genderRequirements"]>) => (
      <CheckboxWrapper>
        <FormLabel htmlFor={field.name} label={"Gender Requirements"} />
        {genderOptions.map((option) => (
          <Checkbox
            key={option.value}
            name={field.name}
            label={option.label}
            checked={field.value?.options.includes(option.value)}
            onChange={(e) => {
              if (e.target.checked) {
                form.setFieldValue(field.name, [
                  ...(field.value || []),
                  option.value,
                ]);
              } else {
                form.setFieldValue(
                  field.name,
                  field.value?.filter((item: string) => item !== option.value)
                );
              }
            }}
          />
        ))}
      </CheckboxWrapper>
    )}
  </FormikField>
);

export default GenderRequirements;
