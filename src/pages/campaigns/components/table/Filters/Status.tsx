import { Select, Skeleton } from "@appquality/appquality-design-system";
import { useGetPhasesQuery } from "src/services/tryberApi";
import { useFiltersCardContext } from "../FilterContext";

const Status = () => {
  const { setFilters, filters } = useFiltersCardContext();
  const { data, isLoading } = useGetPhasesQuery();

  const options: { value: string; label: string }[] = (data?.results || []).map(
    (item) => ({
      value: item.id.toString(),
      label: item.name,
    })
  );
  if (isLoading) return <Skeleton />;
  return (
    <Select
      name="status"
      label=""
      placeholder="Filter by status"
      options={options}
      onChange={(item) => {
        if (item && item.value) {
          setFilters({
            status: parseInt(item.value),
          });
        } else {
          setFilters({ status: undefined });
        }
      }}
      value={{ value: filters.status?.toString(), label: "" }}
    />
  );
};

export default Status;
