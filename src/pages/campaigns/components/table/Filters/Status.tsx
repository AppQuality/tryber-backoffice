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
      isMulti
      placeholder="Filter by status"
      options={options}
      onChange={(items) => {
        if (items && items.length > 0) {
          setFilters({
            status: items.map((i: { value: string }) => parseInt(i.value)),
          });
        } else {
          setFilters({ status: undefined });
        }
      }}
      value={
        filters?.status
          ? filters.status.map((c) => ({ value: c.toString(), label: "" }))
          : { value: "", label: "" }
      }
    />
  );
};

export default Status;
