type ProcessableRequest = {
  id: string;
  status: "pending" | "success" | "error";
  error?: HttpError;
};

type AcceptedPaymentMethod = "all" | "paypal" | "transferwise";

type PaymentActions =
  | AdminPayments_UpdateActions
  | AdminPayments_QueryActions
  | AdminPayments_SelectRequest
  | AdminPayments_ClearSelectedRequests
  | AdminPayments_ToggleModal
  | AdminPayments_StopMultipaymentProcess
  | AdminPayments_UpdateProcessRequests;

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
  payload: number[];
};

type AdminPayments_ClearSelectedRequests = {
  type: "admin/payments/clearSelectedRequests";
};

type AdminPayments_ToggleModal = {
  type: "admin/payments/togglePaymentModal";
  payload: boolean;
};

type AdminPayments_UpdateProcessRequests = {
  type: "admin/payments/updateProcessRequests";
  payload: {
    items: ProcessableRequest[];
    status: string; // processing 2 of 10 requests
  };
};

type AdminPayments_StopMultipaymentProcess = {
  type: "admin/payments/stopMultipaymentProcess";
};

type requestsList =
  ApiOperations["get-payments"]["responses"]["200"]["content"]["application/json"] & {
    limit: number;
    total: number;
    order: ApiOperations["get-payments"]["parameters"]["query"]["order"];
    orderBy: ApiOperations["get-payments"]["parameters"]["query"]["orderBy"];
    // paymentMethod: ApiOperations["get-payments"]["parameters"]["query"]["paymentMethod"],
    paymentMethod: AcceptedPaymentMethod;
  };

type AdminPaymentsState = {
  pendingRequests: requestsList & {
    selected: number[];
    processing: {
      items: ProcessableRequest[];
      status: string; // processing 2 of 10 requests
      abort?: boolean;
    };
  };
  failedRequests: requestsList;
  paymentModal: {
    isOpen: boolean;
  };
};
