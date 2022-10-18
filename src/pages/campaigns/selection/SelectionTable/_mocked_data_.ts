import apifetch from "src/utils/apifetch";

export const getCandidatesMock = async (exampleId: string) => {
  return apifetch({
    endpoint: `/campaigns/${exampleId}/candidates`,
    headers: { Prefer: `code=200, example=${exampleId}` },
  });
};
