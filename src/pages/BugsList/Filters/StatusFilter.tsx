import { Select } from "@appquality/appquality-design-system";
import { useGetCampaignsByCampaignBugsQuery } from "src/services/tryberApi";
import { useFiltersCardContext } from "../FilterContext";

const StatusFilter = ({ id }: { id: string }) => {
  const { filters, setFilters } = useFiltersCardContext();
  const { data, isLoading } = useGetCampaignsByCampaignBugsQuery({
    campaign: id,
  });

  if (isLoading) {
    return <>Loading</>;
  }

  if (!data) {
    return <>Error</>;
  }

  const statuses = data.items.map((i) => ({
    label: i.status.name,
    value: i.status.id.toString(),
  }));
  const options = statuses
    .filter((o, i) => statuses.findIndex((oo) => oo.value === o.value) === i)
    .sort((a, b) => parseInt(b.value) - parseInt(a.value));

  if (options.length < 2) return null;

  return (
    <>
      <Select
        placeholder={"Filter by status"}
        isMulti
        menuTargetQuery={"body"}
        name={"status"}
        options={options}
        label={"Status"}
        value={options.filter((o) =>
          filters.status?.includes(parseInt(o.value))
        )}
        onChange={(newOptions) => {
          setFilters({
            status: newOptions.map((o: { value: string }) => parseInt(o.value)),
          });
        }}
        noOptionsMessage={() => "No options"}
      />
    </>
  );
};

export default StatusFilter;
