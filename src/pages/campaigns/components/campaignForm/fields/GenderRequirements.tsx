import {
  FormikField,
  FormLabel,
  Checkbox,
  TextareaField,
} from "@appquality/appquality-design-system";
import { FieldProps, useFormikContext } from "formik";
import { NewCampaignValues } from "../FormProvider";
import styled from "styled-components";

const genderOptions = [
  { value: 1, label: "Male" },
  { value: 0, label: "Female" },
  { value: 2, label: "Non conforming" },
  { value: -1, label: "Prefer not to answer" },
];

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 32px;
  margin-bottom: 8px;
  max-width: 420px;
`;

const GenderRequirements = () => {
  const { getFieldProps } = useFormikContext<NewCampaignValues>();
  return (
    <FormikField name="genderRequirements">
      {({
        field,
        form,
      }: FieldProps<NewCampaignValues["genderRequirements"]>) => {
        const value = field.value || { customerChoice: "", options: [] };
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
            <TextareaField
              {...getFieldProps(`${field.name}.customerChoice`)}
              label="Customer requirements:"
              resize="vertical"
              placeholder="Specify any custom gender requirements here"
            />
          </div>
        );
      }}
    </FormikField>
  );
};

export default GenderRequirements;
