import {
  FormGroup,
  FormLabel,
  Text,
} from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { useMemo } from "react";
import {
  GetDossiersByCampaignApiResponse,
  useGetUsersByRoleByRoleQuery,
  useGetUsersMePermissionsQuery,
} from "src/services/tryberApi";
import { NewCampaignValues } from "../../FormProvider";
import { getResearcherObjects } from "../../getAssistantIdByRole";
import { SelectField } from "../SelectField";

const ResearcherSelect = ({
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
    return <ResearcherSelectWithPermission />;
  }

  return <ResearcherSelectWithoutPermission dossier={dossier} />;
};

const ResearcherSelectWithoutPermission = ({
  dossier,
}: {
  dossier?: GetDossiersByCampaignApiResponse;
}) => {
  const users = getResearcherObjects({ roles: dossier?.roles });
  const usersNames = (users || [])
    .map((tl) => `${tl.user?.name} ${tl.user?.surname}`)
    .join(", ");
  return (
    <FormGroup>
      <FormLabel label="Researcher" htmlFor="" />
      <Text>
        {users && users.length > 0 ? <>{usersNames}</> : <>No Researchers</>}
      </Text>
    </FormGroup>
  );
};

const ResearcherSelectWithPermission = () => {
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
        placeholder="Start typing to select"
      />
    </>
  );
};

export default ResearcherSelect;
