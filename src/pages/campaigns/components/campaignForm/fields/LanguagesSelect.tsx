import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { useGetLanguagesQuery } from "src/services/tryberApi";
import { NewCampaignValues } from "../FormProvider";
import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";

const LanguageSelect = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const { data: languages } = useGetLanguagesQuery();

  const options = languages
    ? languages.map((language) => ({
        id: language.id.toString(),
        label: language.name,
        value: language.id.toString(),
      }))
    : [];
  return (
    <FormikField name="languages">
      {({
        field,
        meta,
      }: FieldProps<NewCampaignValues["languages"], NewCampaignValues>) => (
        <FormGroup>
          <FormLabel htmlFor={field.name} label="Languages" />
          <Dropdown
            isMulti
            name={field.name}
            options={options}
            value={options.filter((option) => field.value.includes(option.id))}
            onChange={(values) => {
              if (!values) {
                setFieldValue(field.name, []);
                return;
              }
            }}
          />
          {field.value && <span>selected id: {field.value.join(", ")}</span>}
          {meta.touched && meta.error ? <div>error: {meta.error}</div> : null}
          <ErrorMessage name={field.name} />
        </FormGroup>
      )}
    </FormikField>
  );
};

export default LanguageSelect;
