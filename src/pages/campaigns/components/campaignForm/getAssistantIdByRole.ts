import { GetDossiersByCampaignApiResponse } from "src/services/tryberApi";

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
  return getByRole({ roles, roleId: 2 });
};
export const getTlObjects = ({ roles }: Args) => {
  return getByRoleObjects({ roles, roleId: 2 });
};

export const getPm = ({ roles }: Args) => {
  const pm = getByRole({ roles, roleId: 1 });
  return pm.length ? pm[0] : undefined;
};
export const getPmObjects = ({ roles }: Args) => {
  return getByRoleObjects({ roles, roleId: 1 });
};

export const getResearcher = ({ roles }: Args) => {
  return getByRole({ roles, roleId: 3 });
};
export const getResearcherObjects = ({ roles }: Args) => {
  return getByRoleObjects({ roles, roleId: 3 });
};
