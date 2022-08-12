import { useGetUsersMeQuery } from "src/services/tryberApi";

export default () => {
  const { data, error, isFetching } = useGetUsersMeQuery({ fields: "role" });

  return {
    data,
    isError: error || !data,
    isFetching: isFetching,
  };
};
