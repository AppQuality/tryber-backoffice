import { Checkbox, Title } from "@appquality/appquality-design-system";
import { useGetCampaignsByCampaignCandidatesQuery } from "src/services/tryberApi";
import { useAppDispatch, useAppSelector } from "src/store";
import { changeTablePage, setFilters } from "../../../selectionSlice";

const DeviceFilters = ({ id }: { id: string }) => {
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

  const devices = Array.from(
    new Set(data.results?.flatMap((r) => r?.devices).map((d) => d.os) || [])
  );

  return (
    <>
      <Title size="s">Devices</Title>
      {devices.map((d) => (
        <div key={d}>
          <Checkbox
            name={`filters.os.${d}`}
            label={d}
            onChange={(e) => {
              dispatch(changeTablePage({ newPage: 1 }));
              dispatch(
                setFilters({
                  filterByInclude: {
                    ...filterByInclude,
                    os: e.target.checked
                      ? [...(filterByInclude?.os || []), d]
                      : filterByInclude?.os?.filter((o) => o !== d) || [],
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

export { DeviceFilters };
