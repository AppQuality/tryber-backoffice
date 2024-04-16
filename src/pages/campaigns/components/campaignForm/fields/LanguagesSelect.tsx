import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { useGetLanguagesQuery } from "src/services/tryberApi";
import { NewCampaignValues } from "../FormProvider";
import Select from "./components/Select";
import Multiselect from "./components/MultiSelect";

const LanguageSelect = () => {
  const { setFieldValue } = useFormikContext<NewCampaignValues>();
  const { data: languages } = useGetLanguagesQuery();

  const options = languages
    ? languages.map((language) => ({
        id: language.id.toString(),
        label: language.name,
      }))
    : [];
  return (
    <>
      <div>
        <FormikField name="languages">
          {({
            field,
            meta,
          }: FieldProps<NewCampaignValues["languages"], NewCampaignValues>) => (
            <div>
              <Multiselect
                name={field.name}
                options={options}
                value={field.value}
                label="Languages"
                onChange={(e) => {
                  if (field.value.includes(e.currentTarget.value)) {
                    setFieldValue(
                      field.name,
                      field.value.filter(
                        (language) => language !== e.currentTarget.value
                      )
                    );
                    return;
                  }
                  setFieldValue(field.name, [
                    ...field.value,
                    e.currentTarget.value,
                  ]);
                }}
              />
              {field.value && (
                <span>selected id: {field.value.join(", ")}</span>
              )}
              {meta.touched && meta.error ? (
                <div>error: {meta.error}</div>
              ) : null}
            </div>
          )}
        </FormikField>
      </div>
    </>
  );
};

export default LanguageSelect;
