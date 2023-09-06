import { useGetCustomUserFieldsQuery } from "src/services/tryberApi";

const useCufData = () => {
  const { data, error, isFetching } = useGetCustomUserFieldsQuery();
  return {
    data,
    isError: error || !data,
    isFetching: isFetching,
  };
};

export default useCufData;
