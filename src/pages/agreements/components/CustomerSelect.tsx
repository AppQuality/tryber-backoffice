import { Select } from "@appquality/appquality-design-system";
import { useMemo } from "react";
import { useGetCustomersQuery } from "src/services/tryberApi";

type CustomerSelectProps = {
  isMulti?: boolean;
  isDisabled?: boolean;
  name?: string;
  onBlur?: () => void;
  onChange?: (value: any) => void;
  value: string | string[];
};

const CustomerSelect = ({
  isMulti = true,
  isDisabled = false,
  name = "customer-select",
  onBlur,
  onChange,
  value,
}: CustomerSelectProps) => {
  const { data, isLoading, isFetching, isError } = useGetCustomersQuery();
  const options = useMemo(
    () =>
      data?.map((customer) => ({
        label: customer.name || "",
        value: customer.id?.toString() || "",
      })),
    [data]
  );

  const selectedOptions = useMemo(
    () =>
      options?.filter((option) =>
        Array.isArray(value)
          ? value?.some((value) => value === option.value)
          : value === option.value
      ),
    [options, value]
  );
  return (
    <Select
      name={name}
      placeholder={
        isError || !data ? "Error retrieving customers" : "Select a customer"
      }
      data-qa="customer-select"
      isLoading={isLoading || isFetching}
      isMulti={isMulti}
      onBlur={onBlur}
      onChange={onChange}
      label="Customer"
      isDisabled={isDisabled || !data || !data.length || isError}
      value={selectedOptions || []}
      options={options || []}
    />
  );
};

export { CustomerSelect };
