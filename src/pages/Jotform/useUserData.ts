import { useGetUsersMeQuery } from "src/services/tryberApi";

const useUserData = () => {
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

export default useUserData;
