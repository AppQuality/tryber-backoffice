import {
  ErrorMessage,
  FieldProps,
  FormikField,
  Select,
} from "@appquality/appquality-design-system";
import { FormValuesInterface } from "../../FormProvider";

interface UsersQualityOption {
  label: string;
  value: FormValuesInterface["methodology"]["type"];
}
// todo: collegare type dalle api
const usersQualityOptions: UsersQualityOption[] = [
  { label: "Qualitativa", value: "qualitative" },
  { label: "Quantitativa", value: "quantitative" },
  { label: "Quali-Quantitativa", value: "quali-quantitative" },
];

const emptyOption = { label: "" };
const UsersQualityField = () => {
  return (
    <FormikField name="methodology.type">
      {({
        field,
        form,
      }: FieldProps<FormValuesInterface["methodology"]["type"]>) => (
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
