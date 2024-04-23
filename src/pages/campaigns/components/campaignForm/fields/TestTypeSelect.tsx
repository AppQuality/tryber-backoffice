import { useGetCampaignTypesQuery } from "src/services/tryberApi";
import { SelectField } from "./SelectField";
import { useMemo } from "react";

const TestTypeSelect = () => {
  const { data: testTypes } = useGetCampaignTypesQuery();

  const options = useMemo(
    () =>
      testTypes?.map((testType) => ({
        value: testType.id.toString(),
        label: testType.name,
      })) || [],
    [testTypes]
  );

  return <SelectField label="Test type" options={options} name="testType" />;
};

export default TestTypeSelect;
