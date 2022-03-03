type ApiPayments =
  ApiOperations["get-payments"]["responses"]["200"]["content"]["application/json"]["items"];

type ProcessableRequest = {
  id: string;
  status: "pending" | "success" | "error";
  error?: HttpError;
};

type PaymentActions =
  | AdminPayments_UpdateActions
  | AdminPayments_QueryActions
  | AdminPayments_SelectRequest
  | AdminPayments_ClearSelectedRequests
  | AdminPayments_ToggleModal
  | AdminPayments_PaySelectedPendingRequests
  | AdminPayments_ProcessRequests;

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

type AdminPayments_ProcessRequests = {
  type: "admin/payments/processRequests";
  payload: ProcessableRequest[];
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
    processing: ProcessableRequest[];
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
