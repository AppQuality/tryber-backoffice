type ApiPayments =
  ApiOperations["get-payments"]["responses"]["200"]["content"]["application/json"]["items"];

/**
 *  Action types and their payloads
 */

type AdminPayments_UpdateActions = {
  type: "admin/payments/updatePendingReqs" | "admin/payments/updateFailedReqs";
  payload: ApiOperations["get-payments"]["responses"]["200"]["content"]["application/json"];
};

type AdminPayments_QueryActions = {
  type: "admin/payments/updateReqsQuery";
  payload: ApiOperations["get-payments"]["parameters"]["query"];
};

type AdminPayments_SelectRequest = {
  type: "admin/payments/selectRequest";
  payload: ApiOperations["get-payments"]["responses"]["200"]["content"]["application/json"]["items"][0]["id"][];
};

type AdminPayments_ClearSelectedRequests = {
  type: "admin/payments/clearSelectedRequests";
};

type AdminPayments_ToggleModal = {
  type: "admin/payments/togglePaymentModal";
  payload: boolean;
};

type AdminPayments_PaySelectedPendingRequests = {
  type: "admin/payments/payPendingRequests";
  payload: ApiOperations["get-payments"]["responses"]["200"]["content"]["application/json"]["items"][0]["id"][];
};

type requestsList =
  ApiOperations["get-payments"]["responses"]["200"]["content"]["application/json"] & {
    limit: number;
    total: number;
    selected: number[];
    order: ApiOperations["get-payments"]["parameters"]["query"]["order"];
    orderBy: ApiOperations["get-payments"]["parameters"]["query"]["orderBy"];
  };

type AdminPaymentsState = {
  pendingRequests: requestsList;
  failedRequests: requestsList;
  paymentModal: {
    isOpen: boolean;
  };
};
