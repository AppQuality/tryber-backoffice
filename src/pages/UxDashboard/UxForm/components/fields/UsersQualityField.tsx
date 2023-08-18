import {
  ErrorMessage,
  FieldProps,
  FormikField,
  Select,
} from "@appquality/appquality-design-system";
import { FormValuesInterface } from "../../FormProvider";

const usersQualityOptions = [
  { label: "Qualitativa", value: "qualitativa" },
  { label: "Quantitativa", value: "quantitativa" },
];

const emptyOption = { label: "" };
const UsersQualityField = () => {
  return (
    <FormikField name="usersQuality">
      {({ field, form }: FieldProps<FormValuesInterface["usersQuality"]>) => (
        <>
          <Select
            placeholder=""
            options={usersQualityOptions}
            isClearable={false}
            label="Tipologia"
            name={field.name}
            value={
              usersQualityOptions.find(
                (option) => option.value === field.value
              ) || emptyOption
            }
            onChange={(value) => {
              form.setFieldValue(field.name, value?.value || "");
            }}
          />
          <ErrorMessage name={field.name} />
        </>
      )}
    </FormikField>
  );
};

export default UsersQualityField;
