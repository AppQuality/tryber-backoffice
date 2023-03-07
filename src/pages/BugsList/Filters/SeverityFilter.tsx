import { Select } from "@appquality/appquality-design-system";
import { useGetCampaignsByCampaignBugsQuery } from "src/services/tryberApi";
import { useFiltersCardContext } from "../FilterContext";

const SeverityFilter = ({ id }: { id: string }) => {
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

  const severities = data.items.map((i) => ({
    label: i.severity.name,
    value: i.severity.id.toString(),
  }));
  const options = severities
    .filter((o, i) => severities.findIndex((oo) => oo.value === o.value) === i)
    .sort((a, b) => parseInt(b.value) - parseInt(a.value));
  return (
    <>
      <Select
        placeholder={"Filter by severity"}
        isMulti
        menuTargetQuery={"body"}
        name={"severities"}
        options={options}
        label={"Severities"}
        value={options.filter((o) =>
          filters.severities?.includes(parseInt(o.value))
        )}
        onChange={(newOptions) => {
          setFilters({
            severities: newOptions.map((o: { value: string }) =>
              parseInt(o.value)
            ),
          });
        }}
        noOptionsMessage={() => "No options"}
      />
      Filters
    </>
  );
};

export default SeverityFilter;
