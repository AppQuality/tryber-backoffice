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
import { getPmObjects } from "../../getAssistantIdByRole";
import { SelectField } from "../SelectField";

const PmSelect = ({
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
    return <PmSelectWithPermission />;
  }

  return <PmSelectWithoutPermission dossier={dossier} />;
};

const PmSelectWithoutPermission = ({
  dossier,
}: {
  dossier?: GetDossiersByCampaignApiResponse;
}) => {
  const users = getPmObjects({ roles: dossier?.roles });
  const usersNames = (users || [])
    .map((tl) => `${tl.user?.name} ${tl.user?.surname}`)
    .join(", ");
  return (
    <FormGroup>
      <FormLabel label="PM" htmlFor="" />
      <Text>{users && users.length > 0 ? <>{usersNames}</> : <>No PMs</>}</Text>
    </FormGroup>
  );
};

const PmSelectWithPermission = () => {
  const { data: pm } = useGetUsersByRoleByRoleQuery({ role: "assistants" });

  const options = useMemo(
    () =>
      pm?.results.map((pm) => ({
        value: pm.id.toString(),
        label: `${pm.name} ${pm.surname}`,
      })) || [],
    [pm]
  );

  return (
    <SelectField
      name="pm"
      label="PM"
      options={options}
      placeholder="Start typing to select"
    />
  );
};

export default PmSelect;
