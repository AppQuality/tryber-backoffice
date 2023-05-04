import { Select } from "@appquality/appquality-design-system";
import { useGetCampaignTypesQuery } from "src/services/tryberApi";
import { useFiltersCardContext } from "../FilterContext";

const CampaignTypes = () => {
  const { setFilters, filters } = useFiltersCardContext();
  const { data, isLoading, isError } = useGetCampaignTypesQuery();
  if (!data || isLoading || isError) return null;
  const options = data.map((type) => ({
    value: type.id ? type.id.toString() : "0",
    label: type.name || "",
  }));
  return (
    <Select
      isMulti
      name="type"
      label=""
      placeholder="Filter by type"
      options={options}
      onChange={(items) => {
        if (items && items.length > 0) {
          setFilters({
            type: items.map((i: { value: string }) => parseInt(i.value)),
          });
        } else {
          setFilters({ type: undefined });
        }
      }}
      value={
        filters?.type
          ? filters.type.map((c) => ({ value: c.toString(), label: "" }))
          : { value: "", label: "" }
      }
    />
  );
};

export default CampaignTypes;
