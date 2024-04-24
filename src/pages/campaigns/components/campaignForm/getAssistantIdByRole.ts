import { GetDossiersByCampaignApiResponse } from "src/services/tryberApi";

interface Args {
  roles: GetDossiersByCampaignApiResponse["roles"];
}

export const getByRole = ({ roles, roleId }: Args & { roleId: number }) => {
  const role = roles?.filter(({ role, user }) => {
    return role?.id === roleId ? user?.id : null;
  });
  return (
    role?.map((r) => r.user?.id.toString() || "").filter((r) => r.length) || []
  );
};

export const getTl = ({ roles }: Args) => {
  return getByRole({ roles, roleId: 2 });
};

export const getPm = ({ roles }: Args) => {
  const pm = getByRole({ roles, roleId: 1 });
  return pm.length ? pm[0] : undefined;
};

export const getResearcher = ({ roles }: Args) => {
  return getByRole({ roles, roleId: 3 });
};
