import { GetDossiersByCampaignApiResponse } from "src/services/tryberApi";

export const PM_ROLE_ID = 1;
export const TL_ROLE_ID = 2;
export const RESEARCHER_ROLE_ID = 3;

interface Args {
  roles: GetDossiersByCampaignApiResponse["roles"];
}

export const getByRoleObjects = ({
  roles,
  roleId,
}: Args & { roleId: number }) => {
  return roles?.filter(({ role, user }) => {
    return role?.id === roleId ? user?.id : null;
  });
};

export const getByRole = ({ roles, roleId }: Args & { roleId: number }) => {
  const role = getByRoleObjects({ roles, roleId });
  return (
    role?.map((r) => r.user?.id.toString() || "").filter((r) => r.length) || []
  );
};

export const getTl = ({ roles }: Args) => {
  return getByRole({ roles, roleId: TL_ROLE_ID });
};
export const getTlObjects = ({ roles }: Args) => {
  return getByRoleObjects({ roles, roleId: TL_ROLE_ID });
};

export const getPm = ({ roles }: Args) => {
  const pm = getByRole({ roles, roleId: PM_ROLE_ID });
  return pm.length ? pm[0] : undefined;
};
export const getPmObjects = ({ roles }: Args) => {
  return getByRoleObjects({ roles, roleId: PM_ROLE_ID });
};

export const getResearcher = ({ roles }: Args) => {
  return getByRole({ roles, roleId: RESEARCHER_ROLE_ID });
};
export const getResearcherObjects = ({ roles }: Args) => {
  return getByRoleObjects({ roles, roleId: RESEARCHER_ROLE_ID });
};
