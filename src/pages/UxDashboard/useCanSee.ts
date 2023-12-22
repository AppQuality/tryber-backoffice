import { useGetUsersMePermissionsQuery } from "src/services/tryberApi";

const useCanSee = (id: string) => {
  const {
    data: permissions,
    isError,
    isLoading,
  } = useGetUsersMePermissionsQuery();

  if (isError || isLoading) {
    return {
      isError,
      isLoading,
      hasPermission: false,
    };
  }

  let hasPermission = false;
  if (permissions) {
    if (permissions.appq_campaign === true) {
      hasPermission = true;
    } else if (permissions.appq_campaign) {
      hasPermission = permissions.appq_campaign.includes(Number(id));
    }
  }

  return {
    isError,
    isLoading,
    hasPermission,
  };
};
export default useCanSee;
