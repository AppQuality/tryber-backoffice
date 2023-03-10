import { Select } from "@appquality/appquality-design-system";
import { useGetCampaignsByCampaignBugsQuery } from "src/services/tryberApi";
import { useFiltersCardContext } from "../FilterContext";

const TypeFilter = ({ id }: { id: string }) => {
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

  const types = data.items.map((i) => ({
    label: i.type.name,
    value: i.type.id.toString(),
  }));
  const options = types
    .filter((o, i) => types.findIndex((oo) => oo.value === o.value) === i)
    .sort((a, b) => parseInt(b.value) - parseInt(a.value));

  if (options.length < 2) return null;

  return (
    <>
      <Select
        placeholder={"Filter by type"}
        isMulti
        menuTargetQuery={"body"}
        name={"types"}
        options={options}
        label={"Types"}
        value={options.filter((o) =>
          filters.types?.includes(parseInt(o.value))
        )}
        onChange={(newOptions) => {
          setFilters({
            types: newOptions.map((o: { value: string }) => parseInt(o.value)),
          });
        }}
        noOptionsMessage={() => "No options"}
      />
    </>
  );
};

export default TypeFilter;
