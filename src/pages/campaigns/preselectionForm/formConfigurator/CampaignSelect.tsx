import {
  Select,
  FormikField,
  FieldProps,
} from "@appquality/appquality-design-system";
import { useGetCampaignsQuery } from "src/services/tryberApi";

export const CampaignSelect = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  const { data, isLoading, hasValue } = useSelectOptions();

  return (
    <FormikField name={name}>
      {({ field, form }: FieldProps) => {
        const selectedValueIsPresent =
          field.value.value !== "" ? hasValue(field.value) : true;
        return (
          <Select
            isDisabled={isLoading || !selectedValueIsPresent}
            name={name}
            options={async (offset, search) => {
              const options = await data(offset, field.value, search);
              return {
                ...options,
                results: selectedValueIsPresent
                  ? options.results
                  : [...options.results, field.value],
              };
            }}
            onBlur={() => {
              form.setFieldTouched(name);
            }}
            onChange={(value) => {
              if (value === null) {
                value = { label: "", value: "" };
              }
              form.setFieldValue(field.name, value, true);
            }}
            label={label}
            value={field.value}
          />
        );
      }}
    </FormikField>
  );
};

const useSelectOptions = () => {
  const { data, isLoading } = useGetCampaignsQuery();

  if (isLoading) {
    return {
      data: (offset: number, search?: string) =>
        Promise.resolve({ results: [], more: false }),
      isLoading,
      hasValue: (value: SelectOptionType) => false,
    };
  }

  const validCampaigns = (data?.filter((c) => c.id && c.name) || []) as {
    id: number;
    name: string;
  }[];
  const options = validCampaigns.map((c) => ({
    label: `CP${c.id.toString()} - ${c.name}`,
    value: c.id.toString(),
  }));
  options.reverse();

  return {
    data: async (
      pageNumber: number,
      value: SelectOptionType,
      search?: string
    ) => {
      const filteredOptions = options.filter(
        (o) =>
          o.label.toLowerCase().includes((search || "").toLowerCase()) &&
          o.value !== value.value
      );
      const results = filteredOptions.slice(
        pageNumber * 10,
        (pageNumber + 1) * 10
      );
      let more = results.length === 10;
      if (pageNumber === 0) {
        const selectedOption = options.find((o) => o.value === value.value);
        if (selectedOption) {
          results.unshift(selectedOption);
          more = results.length === 11;
        }
      }
      return {
        results,
        more,
      };
    },
    isLoading,
    hasValue: (value: SelectOptionType) =>
      options.some((o) => o.value === value.value),
  };
};
