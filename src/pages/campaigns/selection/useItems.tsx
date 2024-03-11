import {
  useGetCampaignsByCampaignCandidatesQuery,
  useGetCampaignsByCampaignFormsQuery,
} from "src/services/tryberApi";
import { useAppSelector } from "src/store";

const useItems = (id: string, options?: { withLimit: boolean }) => {
  const { currentPage, devicesPerPage, filters } = useAppSelector(
    (state) => state.selection
  );
  const { filterByInclude, filterByExclude, filterByAge } = filters;

  const { data: questions } = useGetCampaignsByCampaignFormsQuery(
    { campaign: id },
    { skip: !id }
  );

  const { data, isFetching, isLoading, error } =
    useGetCampaignsByCampaignCandidatesQuery({
      campaign: id,
      ...(!options || options.withLimit
        ? {
            start: devicesPerPage * (currentPage - 1),
            limit: devicesPerPage,
          }
        : { start: 0, limit: Number.MAX_SAFE_INTEGER }),
      ...(questions && questions.length
        ? { fields: questions.map((q) => `question_${q.id}`).join(",") }
        : {}),
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
