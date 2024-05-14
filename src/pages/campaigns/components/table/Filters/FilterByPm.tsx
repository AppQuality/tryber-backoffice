import { Select } from "@appquality/appquality-design-system";
import {
  useGetUsersByRoleByRoleQuery,
  useGetUsersMeQuery,
} from "src/services/tryberApi";
import { useFiltersCardContext } from "../FilterContext";

const FilterByPm = () => {
  const { data, isLoading } = useGetUsersMeQuery({ fields: "id" });
  const { data: owners, isLoading: ownersLoading } =
    useGetUsersByRoleByRoleQuery({ role: "assistants" });
  const { setFilters, filters } = useFiltersCardContext();
  if (isLoading || !data || ownersLoading || !owners) return null;

  const myId = data.id;
  const options = owners.results
    .filter((owner) => owner.id !== myId)
    .map((owner) => ({
      value: owner.id.toString(),
      label: `${owner.name.charAt(0).toUpperCase()}. ${owner.surname}`,
    }));

  let currentValue = "all";
  if (filters?.pm === myId) currentValue = "mine";
  else if (filters?.pm) currentValue = filters.pm.toString();

  return (
    <Select
      name="pm"
      label=""
      isClearable={false}
      options={[
        { value: "mine", label: "Managed by me" },
        { value: "empty", label: "Without pm" },
        { value: "all", label: "Any pm" },
        ...options,
      ]}
      onChange={(item) => {
        if (item.value === "mine") setFilters({ pm: myId });
        else if (item.value === "empty") setFilters({ pm: "empty" });
        else if (item.value === "all") setFilters({ pm: undefined });
        else setFilters({ pm: Number(item.value) });
      }}
      value={{ value: currentValue, label: "" }}
    />
  );
};

export default FilterByPm;
