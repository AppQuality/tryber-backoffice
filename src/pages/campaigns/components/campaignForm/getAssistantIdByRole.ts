import { GetDossiersByCampaignApiResponse } from "src/services/tryberApi";

interface Args {
  roles: GetDossiersByCampaignApiResponse["roles"];
  roleToFind: "pm" | "tl" | "researcher";
}

export const getAssistantIdByRole = ({ roles, roleToFind }: Args) => {
  const pmRoleId = 1;
  const tlRoleId = 2;
  const researcherRoleId = 3;
  let role;

  if (roleToFind === "tl") {
    role = roles?.find(({ role, user }) => {
      return role?.id === tlRoleId ? user?.id : null;
    });
  }
  if (roleToFind === "pm") {
    role = roles?.find(({ role, user }) => {
      return role?.id === pmRoleId ? user?.id : null;
    });
  }
  if (roleToFind === "researcher") {
    role = roles?.find(({ role, user }) => {
      return role?.id === researcherRoleId ? user?.id : null;
    });
  }

  return role?.user?.id.toString();
};
