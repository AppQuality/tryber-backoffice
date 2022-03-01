const initialState: AdminPaymentsState = {
  paymentModal: {
    isOpen: false,
  },
  pendingRequests: {
    items: [],
    start: 0,
    limit: 10,
    size: 0,
    total: 0,
    selected: [],
    order: "ASC",
    orderBy: "created",
  },
  failedRequests: {
    items: [],
    start: 0,
    limit: 10,
    size: 0,
    total: 0,
    selected: [],
    order: "ASC",
    orderBy: "updated",
  },
};

export default (
  state = initialState,
  action:
    | AdminPayments_UpdateActions
    | AdminPayments_QueryActions
    | AdminPayments_SelectRequest
    | AdminPayments_ClearSelectedRequests
    | AdminPayments_ToggleModal
    | AdminPayments_PaySelectedPendingRequests
) => {
  switch (action.type) {
    case "admin/payments/updatePendingReqs":
      return {
        ...state,
        pendingRequests: {
          ...state.pendingRequests,
          ...action.payload,
        },
      };
    case "admin/payments/updateFailedReqs":
      return {
        ...state,
        failedRequests: {
          ...state.failedRequests,
          ...action.payload,
        },
      };
    case "admin/payments/selectRequest":
      return {
        ...state,
        pendingRequests: {
          ...state.pendingRequests,
          selected: action.payload,
        },
      };
    case "admin/payments/clearSelectedRequests":
      return {
        ...state,
        pendingRequests: {
          ...state.pendingRequests,
          selected: [],
        },
      };
    case "admin/payments/updateReqsQuery":
      if (action.payload.status === "pending") {
        return {
          ...state,
          pendingRequests: {
            ...state.pendingRequests,
            ...action.payload,
          },
        };
      } else if (action.payload.status === "failed") {
        return {
          ...state,
          failedRequests: {
            ...state.failedRequests,
            ...action.payload,
          },
        };
      } else {
        return state;
      }
    case "admin/payments/togglePaymentModal":
      return {
        ...state,
        paymentModal: {
          isOpen: action.payload,
        },
      };
    default:
      return state;
  }
};
