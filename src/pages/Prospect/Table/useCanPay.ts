import { useGetUsersMePermissionsQuery } from "src/services/tryberApi";

const useCanPay = (id: string) => {
  const { data: permissions } = useGetUsersMePermissionsQuery();
  if (permissions) {
    if (permissions.appq_prospect === true) {
      return true;
    }
    if (permissions.appq_prospect) {
      return permissions.appq_prospect.includes(Number(id));
    }
  }
  return false;
};
export default useCanPay;
