import { useGetUsersByRoleByRoleQuery } from "src/services/tryberApi";
import { SelectField } from "../SelectField";
import { useMemo } from "react";

const PmSelect = () => {
  const { data: pm } = useGetUsersByRoleByRoleQuery({ role: "assistants" });

  const options = useMemo(
    () =>
      pm?.results.map((pm) => ({
        value: pm.id.toString(),
        label: `${pm.name} ${pm.surname}`,
      })) || [],
    [pm]
  );

  return <SelectField name="pm" label="PM" options={options} />;
};

export default PmSelect;
