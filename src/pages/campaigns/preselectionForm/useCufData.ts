import { useGetCustomUserFieldsQuery } from "src/services/tryberApi";

export default () => {
  const { data } = useGetCustomUserFieldsQuery();
  const getAllOptions = async (cufId: number): Promise<number[]> => {
    let cufOptions: number[] = [];
    data?.some((res) =>
      res.fields?.some((f) => {
        if (f.id === cufId && f.options) {
          cufOptions = f.options?.map((o) => o.id);
          return true;
        }
        return false;
      })
    );
    return cufOptions;
  };
  return {
    getAllOptions: getAllOptions,
  };
};
