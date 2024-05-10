import {
  Dropdown,
  ErrorMessage,
  FormGroup,
  FormLabel,
} from "@appquality/appquality-design-system";
import { FieldProps, Field as FormikField, useFormikContext } from "formik";
import { useCallback, useMemo } from "react";
import { useGetLanguagesQuery } from "src/services/tryberApi";
import { NewCampaignValues } from "../FormProvider";

const LanguageSelect = () => {
  const fieldName = "languages";
  const { data: languageList } = useGetLanguagesQuery();
  const {
    values: { languages },
    setFieldValue,
  } = useFormikContext<NewCampaignValues>();

  const options = useMemo(
    () =>
      languageList?.map((language) => ({
        id: language.id.toString(),
        label: language.name,
        value: language.id.toString(),
      })) || [],
    [languageList]
  );

  const allOption = useMemo(
    () => ({ value: "all", label: `All Languages` }),
    []
  );

  const getOptions = () => {
    return [allOption, ...options];
  };

  const getValue = useCallback(() => {
    const values = options.filter(
      (o) => languages && languages.includes(o.value)
    );
    if (options.length === values.length) return [allOption];
    return values;
  }, [languages, options, allOption]);

  const handleChange = useCallback(
    (selectedOptions: Readonly<{ label: string; value: string }[]>) => {
      if (selectedOptions === null || selectedOptions === undefined) {
        setFieldValue(fieldName, []);
        return;
      }
      const currentValue = getValue();

      if (
        !currentValue.some((opt) => opt.value === allOption.value) &&
        selectedOptions.some((opt) => opt.value === allOption.value)
      ) {
        selectedOptions = options;
      }

      selectedOptions = selectedOptions.filter(
        (opt) => opt.value !== allOption.value
      );

      setFieldValue(
        fieldName,
        selectedOptions.map((o) => o.value)
      );
    },
    [setFieldValue, allOption.value, getValue, options]
  );
  return (
    <FormikField name="languages">
      {({ field }: FieldProps) => (
        <FormGroup>
          <FormLabel htmlFor={field.name} label="Languages" />
          <Dropdown
            name={field.name}
            id={field.name}
            options={getOptions()}
            isMulti
            value={getValue()}
            onChange={handleChange}
            placeholder="Start typing to select"
          />
          <ErrorMessage name={field.name} />
        </FormGroup>
      )}
    </FormikField>
  );
};

export default LanguageSelect;
