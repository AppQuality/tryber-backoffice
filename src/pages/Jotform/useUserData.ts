import { useGetUsersMeQuery } from "src/services/tryberApi";

export default () => {
  const { data, error, isFetching, isLoading } = useGetUsersMeQuery({
    fields: "role",
  });
  return {
    data,
    isLoading,
    isError: error || !data,
    isFetching,
  };
};
