import apifetch from "../apifetch";

export const adminPayments = async (
  query?: ApiOperations["get-payments"]["parameters"]["query"],
  token?: string
): Promise<
  ApiOperations["get-payments"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/payments",
    token: token,
    params: query,
  });
};
export const payRequests = async (
  id: ApiOperations["post-payments-paymentId"]["parameters"]["path"]["paymentId"],
  token?: string
): Promise<ApiOperations["post-payments-paymentId"]["responses"]> => {
  return apifetch({
    method: "POST",
    endpoint: `/payments/${id}`,
    token: token,
  });
};
