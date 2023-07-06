import { useGetCustomersQuery } from "src/services/tryberApi";

const useCustomers = () => {
  const { data, isLoading, isError } = useGetCustomersQuery();

  if (!data || isError)
    return {
      customers: [],
      isError: true,
      isLoading,
      total: 0,
    };

  // Filter only customers with name
  const customers = data.filter((o) => typeof o.name !== undefined && o.name);

  return {
    customers,
    isError: false,
    isLoading,
    total: data.length,
  };
};

export default useCustomers;
