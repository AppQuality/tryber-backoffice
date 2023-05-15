import { Select } from "@appquality/appquality-design-system";
import {
  useGetCampaignsOwnersQuery,
  useGetUsersMeQuery,
} from "src/services/tryberApi";
import { useFiltersCardContext } from "../FilterContext";

const MyCampaign = () => {
  const { data, isLoading } = useGetUsersMeQuery({ fields: "id" });
  const { data: owners, isLoading: ownersLoading } =
    useGetCampaignsOwnersQuery();
  const { setFilters, filters } = useFiltersCardContext();
  if (isLoading || !data || ownersLoading || !owners) return null;

  const myId = data.id;
  const options = owners.map((owner) =>
    owner.id === myId
      ? {
          value: "mine",
          label: "Managed by me",
        }
      : {
          value: owner.id.toString(),
          label: `${owner.name.charAt(0).toUpperCase()}. ${owner.surname}`,
        }
  );

  let currentValue = "all";
  if (filters?.csm === myId) currentValue = "mine";
  else if (filters?.csm) currentValue = filters.csm.toString();
  return (
    <Select
      name="mine"
      label=""
      isClearable={false}
      options={[...options, { value: "all", label: "Managed by anyone" }]}
      onChange={(item) => {
        if (item.value === "mine") setFilters({ csm: myId });
        else if (item.value === "all") setFilters({ csm: undefined });
        else setFilters({ csm: Number(item.value) });
      }}
      value={{ value: currentValue, label: "" }}
    />
  );
};

export default MyCampaign;
