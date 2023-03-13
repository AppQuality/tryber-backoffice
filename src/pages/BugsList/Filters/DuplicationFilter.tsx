import { Select } from "@appquality/appquality-design-system";
import { useGetCampaignsByCampaignBugsQuery } from "src/services/tryberApi";
import { useFiltersCardContext } from "../FilterContext";

const DuplicationFilter = ({ id }: { id: string }) => {
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

  const DuplicationStatuses: Record<
    (typeof data)["items"][number]["duplication"],
    string
  > = {
    father: "Father",
    duplicated: "Duplicated",
    unique: "Unique",
  };

  const duplicationStatus = data.items.map((i) => ({
    label: DuplicationStatuses[i.duplication],
    value: i.duplication,
  }));
  const options = duplicationStatus
    .filter(
      (o, i) => duplicationStatus.findIndex((oo) => oo.value === o.value) === i
    )
    .sort((a, b) => parseInt(b.value) - parseInt(a.value));

  if (options.length < 2) return null;

  return (
    <>
      <Select
        placeholder={"Filter by unique/duplicated"}
        isMulti
        menuTargetQuery={"body"}
        name={"duplication"}
        options={options}
        label={"Unique/Duplicated"}
        value={options.filter((o) => filters.duplication?.includes(o.value))}
        onChange={(newOptions) => {
          setFilters({
            duplication: newOptions.map((o: { value: string }) => o.value),
          });
        }}
        noOptionsMessage={() => "No options"}
      />
    </>
  );
};

export default DuplicationFilter;
