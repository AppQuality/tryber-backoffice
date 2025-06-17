import {
  Checkbox,
  FormikField,
  FormLabel,
} from "@appquality/appquality-design-system";
import { FieldProps, useFormikContext } from "formik";
import styled from "styled-components";
import { NewCampaignValues } from "../FormProvider";

const genderOptions = [
  { value: 1, label: "Male" },
  { value: 0, label: "Female" },
  { value: 2, label: "Non conforming" },
  { value: -1, label: "Prefer not to answer" },
];

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.grid.sizes[3]}
    ${({ theme }) => theme.grid.sizes[4]};
  margin-bottom: ${({ theme }) => theme.grid.sizes[2]};
`;

const GenderRequirements = () => {
  const { getFieldProps } = useFormikContext<NewCampaignValues>();
  return (
    <FormikField name="genderRequirements">
      {({
        field,
        form,
      }: FieldProps<NewCampaignValues["genderRequirements"]>) => {
        const value = field.value || { options: [] as number[] };
        return (
          <div>
            <FormLabel htmlFor={field.name} label={""} />
            <CheckboxGrid>
              {genderOptions.map((option) => (
                <Checkbox
                  key={option.value + option.label}
                  name={`${field.name}.options`}
                  label={option.label}
                  checked={value.options.includes(option.value)}
                  onChange={(e) => {
                    const newOptions = e.target.checked
                      ? [...value.options, option.value]
                      : value.options.filter(
                          (item: number) => item !== option.value
                        );
                    form.setFieldValue(`${field.name}.options`, newOptions);
                  }}
                />
              ))}
            </CheckboxGrid>
          </div>
        );
      }}
    </FormikField>
  );
};

export default GenderRequirements;
