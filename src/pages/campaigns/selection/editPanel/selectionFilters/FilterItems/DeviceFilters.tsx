import { useGetCampaignsByCampaignCandidatesQuery } from "src/services/tryberApi";
import { useAppSelector } from "src/store";
import { setFilters } from "../../../selectionSlice";
import { CheckboxFilter } from "./CheckboxFilter";

const DeviceFilters = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetCampaignsByCampaignCandidatesQuery({
    campaign: id,
    limit: Number.MAX_SAFE_INTEGER,
  });
  const { filterByInclude } = useAppSelector(
    (state) => state.selection.filters
  );

  if (!data || isLoading) {
    return null;
  }

  const devices = Array.from(
    new Set(data.results?.flatMap((r) => r?.devices).map((d) => d.os) || [])
  );

  const deviceData =
    filterByInclude && "os" in filterByInclude ? filterByInclude.os : [];

  return (
    <CheckboxFilter
      title="Devices"
      key="os"
      options={devices}
      onSelect={(checked, option) =>
        setFilters({
          filterByInclude: {
            ...filterByInclude,
            os: checked
              ? [...deviceData, option]
              : deviceData.filter((o) => o !== option) || [],
          },
        })
      }
    />
  );
};

export { DeviceFilters };
