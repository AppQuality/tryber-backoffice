import { Select } from "@appquality/appquality-design-system";
import useCustomers from "./useCustomers";
import { useFiltersAgreementsContext } from "../../FilterContext";

const CustomersFilter = () => {
  const { filters, setFilters } = useFiltersAgreementsContext();
  const { customers, isLoading, isError, total } = useCustomers();

  const options = customers.map((i) => ({
    label: i.name ?? "",
    value: i.id ? i.id.toString() : "",
  }));

  if (isLoading) {
    return <>Loading</>;
  }

  if (isError) {
    return <>Error</>;
  }

  if (!options.length) return null;

  return (
    <Select
      placeholder={"Filter by customers"}
      isMulti
      menuTargetQuery={"body"}
      name={"customers-select"}
      label={`Customers (${total})`}
      options={options}
      value={
        filters.customers
          ? filters.customers?.map((c) => ({
              label: c.name ?? "",
              value: c.id ? c.id.toString() : "",
            }))
          : []
      }
      onChange={(newOptions) => {
        setFilters({
          customers: newOptions.map((o: { value: string; label: string }) => ({
            id: parseInt(o.value),
            name: o.label,
          })),
        });
      }}
      noOptionsMessage={() => "No options"}
    />
  );
};

export default CustomersFilter;
