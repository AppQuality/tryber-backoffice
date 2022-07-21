import { useGetCustomUserFieldsQuery } from "src/services/tryberApi";

export default () => {
  const { data, error, isFetching } = useGetCustomUserFieldsQuery();

  return {
    data,
    isError: error || !data,
    isFetching: isFetching,
  };
};
