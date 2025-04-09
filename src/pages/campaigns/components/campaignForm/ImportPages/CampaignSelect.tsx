import { Select, SelectType } from "@appquality/appquality-design-system";
import { useState } from "react";
import { useGetCampaignsQuery } from "src/services/tryberApi";

const useSelectOptions = () => {
  const { data, isLoading } = useGetCampaignsQuery({
    fields: "id,name",
  });

  if (isLoading) {
    return {
      data: (offset: number, search?: string) =>
        Promise.resolve({ results: [], more: false }),
      isLoading,
      hasValue: (value: SelectOptionType) => false,
    };
  }
  const campaigns = data?.items || [];
  const validCampaigns = (campaigns.filter((c) => c.id && c.name) || []) as {
    id: number;
    name: string;
  }[];
  const options = validCampaigns.map((c) => ({
    label: `CP${c.id.toString()} - ${c.name}`,
    value: c.id.toString(),
  }));

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

export const CampaignSelect = ({
  name,
  label,
  onChange,
  placeholder,
  onBlur,
}: {
  name: string;
  label: string;
  onChange?: (value: SelectType.Option) => void;
  placeholder: string;
  onBlur?: () => void;
}) => {
  const { data, isLoading, hasValue } = useSelectOptions();

  const [selectedCampaign, setSelectedCampaign] = useState<SelectType.Option>({
    label: "",
    value: "",
  });

  const selectedValueIsPresent =
    selectedCampaign && selectedCampaign.value !== ""
      ? hasValue(selectedCampaign)
      : true;
  return (
    <>
      <Select
        onBlur={onBlur}
        isDisabled={isLoading || !selectedValueIsPresent}
        name={name}
        label={label}
        key={selectedCampaign.value?.toString()}
        onChange={(value) => {
          if (value === null) {
            value = { label: "", value: "" };
          }
          setSelectedCampaign(value);
          if (onChange) {
            onChange(value);
          }
        }}
        placeholder={placeholder}
        menuTargetQuery={"body"}
        options={async (offset, search) => {
          const options = await data(offset, selectedCampaign as any, search);
          return {
            ...options,
            results: selectedValueIsPresent
              ? options.results
              : [...options.results, selectedCampaign],
          };
        }}
        value={selectedCampaign}
      />
    </>
  );
};
