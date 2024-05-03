import {
  FormGroup,
  FormLabel,
  Text,
} from "@appquality/appquality-design-system";
import { useMemo } from "react";
import {
  GetDossiersByCampaignApiResponse,
  useGetUsersByRoleByRoleQuery,
  useGetUsersMePermissionsQuery,
} from "src/services/tryberApi";
import { SelectField } from "../SelectField";

const CsmSelect = ({
  dossier,
}: {
  dossier?: GetDossiersByCampaignApiResponse;
}) => {
  const { data: permissions } = useGetUsersMePermissionsQuery();

  if (!permissions) return null;

  if (
    "appq_campaign" in permissions &&
    typeof permissions.appq_campaign !== "undefined" &&
    permissions.appq_campaign === true
  ) {
    return <CsmSelectWithPermission />;
  }

  return <CsmSelectWithoutPermission dossier={dossier} />;
};

const CsmSelectWithoutPermission = ({
  dossier,
}: {
  dossier?: GetDossiersByCampaignApiResponse;
}) => {
  return (
    <FormGroup>
      <FormLabel label="Csm" htmlFor="" />
      <Text>{dossier?.csm ? <>{dossier?.csm.name}</> : <>No CSM</>}</Text>
    </FormGroup>
  );
};

const CsmSelectWithPermission = () => {
  const { data: csm } = useGetUsersByRoleByRoleQuery({ role: "assistants" });

  const options = useMemo(
    () =>
      csm?.results.map((csm) => ({
        value: csm.id.toString(),
        label: `${csm.name} ${csm.surname}`,
      })) || [],
    [csm]
  );

  return <SelectField name="csm" label="CSM" options={options} />;
};

export default CsmSelect;
