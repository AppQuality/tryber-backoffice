import { useGetUsersByRoleByRoleQuery } from "src/services/tryberApi";
import { SelectField } from "../SelectField";
import { useMemo } from "react";

const CsmSelect = () => {
  const { data: csm } = useGetUsersByRoleByRoleQuery({ role: "assistants" });

  const options = useMemo(
    () =>
      csm?.results.map((csm) => ({
        value: csm.id.toString(),
        label: `${csm.name} ${csm.surname}`,
      })) || [],
    [csm]
  );

  return <SelectField name="csm" label="CSM" options={options} />;
};

export default CsmSelect;
