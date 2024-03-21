import { useGetCampaignsByCampaignCandidatesQuery } from "src/services/tryberApi";
import { useAppSelector } from "src/store";
import { setFilters } from "../../../selectionSlice";
import { CheckboxFilter } from "./CheckboxFilter";

const BughuntingLevelFilters = ({ id }: { id: string }) => {
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

  const bhLevels = Array.from(
    new Set(data.results?.map((r) => r?.levels?.bugHunting) || [])
  );

  const bhData =
    filterByInclude &&
    "bughunting" in filterByInclude &&
    filterByInclude.bughunting
      ? filterByInclude.bughunting
      : [];

  return (
    <CheckboxFilter
      title="BH Level"
      key="bughunting"
      options={bhLevels}
      selected={
        filterByInclude && "bughunting" in filterByInclude
          ? filterByInclude.bughunting
          : undefined
      }
      onSelect={(checked, option) =>
        setFilters({
          filterByInclude: {
            ...filterByInclude,
            bughunting: checked
              ? [...bhData, option]
              : bhData.filter((o) => o !== option) || [],
          },
        })
      }
    />
  );
};

export { BughuntingLevelFilters };
