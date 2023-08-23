import {
  ErrorMessage,
  FieldProps,
  FormikField,
  Select,
} from "@appquality/appquality-design-system";
import { FormValuesInterface } from "../../FormProvider";

// todo: collegare type dalle api
const usersQualityOptions = [
  { label: "Qualitativa", value: "qualitativa" },
  { label: "Quantitativa", value: "quantitativa" },
  { label: "Quali-Quantitativa", value: "quali-quantitativa" },
];

const emptyOption = { label: "" };
const UsersQualityField = () => {
  return (
    <FormikField name="usersQuality">
      {({ field, form }: FieldProps<FormValuesInterface["usersQuality"]>) => (
        <>
          <Select
            placeholder=""
            data-qa="users-quality-select"
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
