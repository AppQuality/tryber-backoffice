import { useGetCampaignsByCampaignCandidatesQuery } from "src/services/tryberApi";
import { useAppSelector } from "src/store";
import { setFilters } from "../../../selectionSlice";
import { CheckboxFilter } from "./CheckboxFilter";

const MetalLevelFilters = ({ id }: { id: string }) => {
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

  const metalLevels = Array.from(
    new Set(data.results?.map((r) => r?.levels?.metal) || [])
  );

  const metalData =
    filterByInclude && "metal" in filterByInclude && filterByInclude.metal
      ? filterByInclude.metal
      : [];

  return (
    <CheckboxFilter
      title="Metal Level"
      key="metal"
      options={metalLevels}
      selected={
        filterByInclude && "metal" in filterByInclude
          ? filterByInclude.metal
          : undefined
      }
      onSelect={(checked, option) =>
        setFilters({
          filterByInclude: {
            ...filterByInclude,
            metal: checked
              ? [...metalData, option]
              : metalData.filter((o) => o !== option) || [],
          },
        })
      }
    />
  );
};

export { MetalLevelFilters };
