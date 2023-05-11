import { Select } from "@appquality/appquality-design-system";
import { useFiltersCardContext } from "../FilterContext";

type ItemTypes = "incoming" | "running" | "closed";
const Status = () => {
  const { setFilters, filters } = useFiltersCardContext();
  const options: { value: ItemTypes; label: string }[] = [
    { value: "incoming", label: "Incoming" },
    { value: "running", label: "Running" },
    { value: "closed", label: "Closed" },
  ];
  return (
    <Select
      name="status"
      label=""
      placeholder="Filter by status"
      options={options}
      onChange={(item) => {
        if (item && item.value) {
          setFilters({
            status: item.value as ItemTypes,
          });
        } else {
          setFilters({ status: undefined });
        }
      }}
      value={{ value: filters.status, label: "" }}
    />
  );
};

export default Status;
