import { Select } from "@appquality/appquality-design-system";
import { useFiltersCardContext } from "../FilterContext";

const MyCampaign = () => {
  const { setFilters, filters } = useFiltersCardContext();
  return (
    <Select
      name="mine"
      label=""
      isClearable={false}
      options={[
        { value: "mine", label: "Managed by me" },
        { value: "all", label: "Managed by anyone" },
      ]}
      onChange={(item) => {
        if (item.value === "mine") setFilters({ mine: true });
        else setFilters({ mine: false });
      }}
      value={{ value: filters?.mine ? "mine" : "all", label: "" }}
    />
  );
};

export default MyCampaign;
