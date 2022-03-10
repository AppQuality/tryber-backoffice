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
    selected: new Set<number>(),
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
};

export default (state = initialState, action: PaymentActions) => {
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
      return {
        ...state,
        pendingRequests: {
          ...state.pendingRequests,
          ...action.payload,
        },
      };
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
