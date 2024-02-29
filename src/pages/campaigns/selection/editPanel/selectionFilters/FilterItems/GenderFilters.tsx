import { useGetCampaignsByCampaignCandidatesQuery } from "src/services/tryberApi";
import { useAppSelector } from "src/store";
import { setFilters } from "../../../selectionSlice";
import { CheckboxFilter } from "./CheckboxFilter";

const GenderFilters = ({ id }: { id: string }) => {
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

  const genders = Array.from(
    new Set(data.results?.map((r) => r?.gender) || [])
  );

  return (
    <CheckboxFilter
      title="Genders"
      key="gender"
      options={genders}
      onSelect={(checked, option) =>
        setFilters({
          filterByInclude: {
            ...filterByInclude,
            gender: checked
              ? [...(filterByInclude?.gender || []), option]
              : filterByInclude?.gender?.filter((o) => o !== option) || [],
          },
        })
      }
    />
  );
};

export { GenderFilters };
