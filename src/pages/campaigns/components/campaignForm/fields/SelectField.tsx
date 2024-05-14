import {
  Dropdown,
  ErrorMessage,
  FieldProps,
  FormGroup,
  FormLabel,
  Text,
  FormikField,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useCallback, useMemo } from "react";
import { NewCampaignValues } from "../FormProvider";

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  name: keyof NewCampaignValues;
  options: Option[];
  label: string;
  isMulti?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  onCreateOption?: (inputValue: string) => Promise<void>;
  notes?: string;
  required?: boolean;
}

export const SelectField = ({
  name,
  options,
  label,
  isMulti,
  isDisabled,
  onCreateOption,
  notes,
  placeholder,
  required,
}: SelectProps) => {
  const { setFieldValue, values } = useFormikContext<NewCampaignValues>();
  const currentValue = values[name];
  const optionValue = useMemo(() => {
    if (currentValue) {
      if (isMulti && Array.isArray(currentValue)) {
        return options.filter((option) => currentValue.includes(option.value));
      }
      return options.find((option) => option.value === currentValue);
    } else {
      return undefined;
    }
  }, [options, isMulti, currentValue]);

  const handleChange = useCallback(
    (option) => {
      if (option === null || option === undefined) {
        setFieldValue(name, isMulti ? [] : "");
        return;
      }
      if (isMulti && Array.isArray(option)) {
        setFieldValue(
          name,
          option.map((opt) => opt.value)
        );
      } else {
        setFieldValue(name, option.value);
      }
    },
    [isMulti, name, setFieldValue]
  );

  return (
    <FormikField name={name}>
      {({ field }: FieldProps<string>) => (
        <FormGroup>
          <FormLabel
            htmlFor={field.name}
            label={
              <>
                <span>{label}</span>{" "}
                {required && <span className="aq-text-danger">*</span>}
              </>
            }
          />
          <Dropdown
            isMulti={isMulti}
            isClearable
            isDisabled={isDisabled}
            id={field.name}
            name={field.name}
            options={options}
            value={optionValue}
            onChange={handleChange}
            onCreateOption={onCreateOption}
            placeholder={placeholder || "Select an option"}
          />
          {notes && (
            <Text small className="aq-mt-2">
              {notes}
            </Text>
          )}
          <ErrorMessage name={field.name} />
        </FormGroup>
      )}
    </FormikField>
  );
};
