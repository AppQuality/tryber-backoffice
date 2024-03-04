import { useGetCampaignsByCampaignCandidatesQuery } from "src/services/tryberApi";
import { useAppSelector } from "src/store";

const useItems = (id: string, options?: { withLimit: boolean }) => {
  const { currentPage, devicesPerPage, questionsId, filters } = useAppSelector(
    (state) => state.selection
  );
  const { filterByInclude, filterByExclude, filterByAge } = filters;
  const { data, isFetching, isLoading, error } =
    useGetCampaignsByCampaignCandidatesQuery({
      campaign: id,
      ...(!options || options.withLimit
        ? {
            start: devicesPerPage * (currentPage - 1),
            limit: devicesPerPage,
          }
        : { start: 0, limit: Number.MAX_SAFE_INTEGER }),
      ...(questionsId.length ? { fields: questionsId.join(",") } : {}),
      filterByInclude,
      filterByExclude,
      filterByAge,
    });

  return {
    data,
    totalRows: data?.total || 0,
    isFetching,
    isLoading,
    error,
  };
};

export default useItems;
