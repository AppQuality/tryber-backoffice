import { useGetCampaignsOwnersQuery } from "src/services/tryberApi";
import { SelectField } from "../SelectField";
import { useMemo } from "react";

const CsmSelect = () => {
  const { data: csm } = useGetCampaignsOwnersQuery();

  const options = useMemo(
    () =>
      csm?.map((csm) => ({
        value: csm.id.toString(),
        label: `${csm.name} ${csm.surname}`,
      })) || [],
    [csm]
  );

  return <SelectField name="csm" label="CSM" options={options} />;
};

export default CsmSelect;
