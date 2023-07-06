import { Select } from "@appquality/appquality-design-system";
import { Option } from "@appquality/appquality-design-system/dist/stories/select/_types";
import { useMemo } from "react";
import { useGetCustomersQuery } from "src/services/tryberApi";

type CustomerSelectProps = {
  isMulti?: boolean;
  name?: string;
  onBlur?: () => void;
  onChange?: (value: any) => void;
  value: Option | Option[];
};

const CustomerSelect = ({
  isMulti = true,
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
      isDisabled={!data || !data.length || isError}
      value={value}
      options={options || []}
    />
  );
};

export { CustomerSelect };
