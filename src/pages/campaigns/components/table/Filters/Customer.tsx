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
      isMulti
      name="customer"
      label=""
      options={options}
      onChange={(items) => {
        if (items && items.length > 0) {
          setFilters({
            customer: items.map((i: { value: string }) => parseInt(i.value)),
          });
        } else {
          setFilters({ customer: undefined });
        }
      }}
      value={
        filters?.customer
          ? filters.customer.map((c) => ({ value: c.toString(), label: "" }))
          : { value: "", label: "" }
      }
    />
  );
};

export default Customer;
