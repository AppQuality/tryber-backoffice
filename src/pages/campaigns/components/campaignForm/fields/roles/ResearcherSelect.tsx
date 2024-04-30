import { useMemo } from "react";
import { useGetUsersByRoleByRoleQuery } from "src/services/tryberApi";
import { SelectField } from "../SelectField";

const ResearcherSelect = () => {
  const { data: researcher } = useGetUsersByRoleByRoleQuery({
    role: "assistants",
  });

  const options = useMemo(
    () =>
      researcher?.results.map((researcher) => ({
        value: researcher.id.toString(),
        label: `${researcher.name} ${researcher.surname}`,
      })) || [],
    [researcher]
  );

  return (
    <>
      <SelectField
        isMulti
        name="researcher"
        label="Researcher"
        options={options}
      />
    </>
  );
};

export default ResearcherSelect;
