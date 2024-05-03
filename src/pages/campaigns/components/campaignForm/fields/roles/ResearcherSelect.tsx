import { useFormikContext } from "formik";
import { useMemo } from "react";
import { useGetUsersByRoleByRoleQuery } from "src/services/tryberApi";
import { NewCampaignValues } from "../../FormProvider";
import { SelectField } from "../SelectField";

const ResearcherSelect = () => {
  const { values } = useFormikContext<NewCampaignValues>();
  const { data: researcher } = useGetUsersByRoleByRoleQuery({
    role: "assistants",
  });

  const options = useMemo(
    () =>
      researcher?.results
        .filter((researcher) => !values.tl?.includes(researcher.id.toString()))
        .map((researcher) => ({
          value: researcher.id.toString(),
          label: `${researcher.name} ${researcher.surname}`,
        })) || [],
    [researcher, values.tl]
  );

  return (
    <>
      <SelectField
        isMulti
        name="researcher"
        label="Researcher"
        options={options}
      />
    </>
  );
};

export default ResearcherSelect;
