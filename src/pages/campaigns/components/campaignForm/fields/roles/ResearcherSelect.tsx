import { useGetCampaignsOwnersQuery } from "src/services/tryberApi";
import { SelectField } from "../SelectField";
import { useMemo } from "react";

const ResearcherSelect = () => {
  const { data: researcher } = useGetCampaignsOwnersQuery();

  const options = useMemo(
    () =>
      researcher?.map((researcher) => ({
        value: researcher.id.toString(),
        label: `${researcher.name} ${researcher.surname}`,
      })) || [],
    [researcher]
  );

  return <SelectField name="researcher" label="Researcher" options={options} />;
};

export default ResearcherSelect;
