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
    processing: {
      items: [],
      status: "0 payment requests are being processed",
    },
    order: "ASC",
    orderBy: "created",
    paymentMethod: "all",
  },
  failedRequests: {
    items: [],
    start: 0,
    limit: 10,
    size: 0,
    total: 0,
    order: "ASC",
    orderBy: "updated",
    paymentMethod: "all",
  },
  retryModal: {
    isOpen: false,
  },
  deleteModal: {
    isOpen: false,
  },
};

const reducer = (state = initialState, action: PaymentActions) => {
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
    case "admin/payments/updateProcessRequests":
      return {
        ...state,
        pendingRequests: {
          ...state.pendingRequests,
          selected: [],
          processing: action.payload,
        },
      };
    case "admin/payments/stopMultipaymentProcess":
      return {
        ...state,
        pendingRequests: {
          ...state.pendingRequests,
          processing: {
            ...state.pendingRequests.processing,
            abort: true,
          },
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
    case "admin/payments/toggleRetryModal":
      return {
        ...state,
        retryModal: {
          isOpen: action.payload.isOpen,
          requestId: action.payload.requestId,
        },
      };
    case "admin/payments/toggleDeleteModal":
      return {
        ...state,
        deleteModal: {
          isOpen: action.payload.isOpen,
          requestId: action.payload.requestId,
        },
      };
    case "admin/payments/setActionOutcome":
      return {
        ...state,
        actionOutcome: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
