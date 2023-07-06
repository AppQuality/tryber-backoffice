import { Select } from "@appquality/appquality-design-system";
import useCustomerIds from "./useCustomerIds";
import { useFiltersCardContext } from "../../FilterContext";
import { useEffect } from "react";

const CustomersFilter = ({ id }: { id: string }) => {
  const { filters, setFilters } = useFiltersCardContext();
  const { tags, isLoading, isError, total } = useCustomerIds(id);

  useEffect(() => {
    if (tags.length) {
      setFilters({
        tags: tags.map((o) => o.id.toString()),
      });
    }
  }, [tags.length]);

  if (isLoading) {
    return <>Loading</>;
  }

  if (isError) {
    return <>Error</>;
  }

  const options = tags.map((i) => ({
    label: i.name,
    value: i.id.toString(),
  }));

  if (options.length < 2) return null;

  return (
    <Select
      placeholder={"Filter by tags"}
      isMulti
      menuTargetQuery={"body"}
      name={"tags"}
      label={`Tags (${total})`}
      options={options}
      value={options.filter((o) => filters.tags?.includes(o.value))}
      onChange={(newOptions) => {
        setFilters({
          tags: newOptions.map((o: { value: string }) => o.value),
        });
      }}
      noOptionsMessage={() => "No options"}
    />
  );
};

export default CustomersFilter;
