import { Checkbox, Title } from "@appquality/appquality-design-system";
import { useGetCampaignsByCampaignCandidatesQuery } from "src/services/tryberApi";
import { useAppDispatch, useAppSelector } from "src/store";
import { changeTablePage, setFilters } from "../../../selectionSlice";

const GenderFilters = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetCampaignsByCampaignCandidatesQuery({
    campaign: id,
    limit: Number.MAX_SAFE_INTEGER,
  });
  const dispatch = useAppDispatch();
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
    <>
      <Title size="s">Genders</Title>
      {genders.map((d) => (
        <div key={d}>
          <Checkbox
            name={`filters.genders.${d}`}
            label={d}
            onChange={(e) => {
              dispatch(changeTablePage({ newPage: 1 }));
              dispatch(
                setFilters({
                  filterByInclude: {
                    ...filterByInclude,
                    gender: e.target.checked
                      ? [...(filterByInclude?.gender || []), d]
                      : filterByInclude?.gender?.filter((o) => o !== d) || [],
                  },
                })
              );
            }}
          />
        </div>
      ))}
    </>
  );
};

export { GenderFilters };
