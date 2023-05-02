import { Select } from "@appquality/appquality-design-system";
import { useGetCustomersQuery } from "src/services/tryberApi";
import { useFiltersCardContext } from "../FilterContext";

const Customer = () => {
  const { setFilters, filters } = useFiltersCardContext();
  const { data, isLoading, isError } = useGetCustomersQuery();
  if (!data || isLoading || isError) return null;
  const options = data.map((customer) => ({
    value: customer.id ? customer.id.toString() : "0",
    label: customer.name || "",
  }));
  return (
    <Select
      name="customer"
      label=""
      options={options}
      onChange={(item) => {
        if (item && item.value) {
          setFilters({ customer: parseInt(item.value) });
        } else {
          setFilters({ customer: undefined });
        }
      }}
      value={{
        value: filters?.customer ? filters.customer.toString() : "",
        label: "",
      }}
    />
  );
};

export default Customer;
