import { Select } from "@appquality/appquality-design-system";
import { useGetCampaignsByCampaignBugsQuery } from "src/services/tryberApi";
import { useFiltersCardContext } from "../FilterContext";

const TagsFilter = ({ id }: { id: string }) => {
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

  const tags = data.items
    .reduce((carry, i) => {
      if (!i.tags) return carry;
      return [...carry, ...i.tags];
    }, [] as NonNullable<(typeof data)["items"][number]["tags"]>[number][])
    .map((i) => ({
      label: i.name,
      value: i.id.toString(),
    }));
  const options = tags
    .filter((o, i) => tags.findIndex((oo) => oo.value === o.value) === i)
    .sort((a, b) => parseInt(b.value) - parseInt(a.value));

  if (options.length < 2) return null;

  options.unshift({ label: "No tags", value: "none" });
  return (
    <>
      <Select
        placeholder={"Filter by tags"}
        isMulti
        menuTargetQuery={"body"}
        name={"tags"}
        options={options}
        label={"Tags"}
        value={options.filter((o) => filters.tags?.includes(o.value))}
        onChange={(newOptions) => {
          setFilters({
            tags: newOptions.map((o: { value: string }) => o.value),
          });
        }}
        noOptionsMessage={() => "No options"}
      />
    </>
  );
};

export default TagsFilter;
