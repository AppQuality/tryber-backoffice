import { useGetLanguagesQuery } from "src/services/tryberApi";
import { useMemo } from "react";
import { SelectField } from "./SelectField";

const LanguageSelect = () => {
  const { data: languages } = useGetLanguagesQuery();

  const options = useMemo(
    () =>
      languages?.map((language) => ({
        id: language.id.toString(),
        label: language.name,
        value: language.id.toString(),
      })) || [],
    [languages]
  );

  return (
    <SelectField name="languages" label="Languages" isMulti options={options} />
  );
};

export default LanguageSelect;
