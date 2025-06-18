import {
  ErrorMessage,
  FormGroup,
  Select,
} from "@appquality/appquality-design-system";
import provinces from "comuni-province-regioni/lib/province";
import { Field as FormikField, FieldProps } from "formik";
import { NewCampaignValues } from "../FormProvider";

const ProvinceSelect = () => {
  return (
    <FormikField name="provinces">
      {({ field, form }: FieldProps<NewCampaignValues["provinces"]>) => {
        return (
          <FormGroup>
            <Select
              isMulti
              name={field.name}
              options={Object.entries(provinces).map(([name, province]) => ({
                label: name,
                value: province,
              }))}
              onBlur={() => {
                form.setFieldTouched(field.name, true);
                form.setFieldTouched("countries", true);
              }}
              onChange={(value) => {
                form.setFieldValue(
                  field.name,
                  value.map((v: SelectOptionType) => v.value),
                  true
                );
              }}
              label={"Provinces"}
              value={field.value?.map((p) => ({ value: p, label: "" })) || []}
            />
            <ErrorMessage name={field.name} />
          </FormGroup>
        );
      }}
    </FormikField>
  );
};

export default ProvinceSelect;
