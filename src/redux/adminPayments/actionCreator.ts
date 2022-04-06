import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import API from "src/utils/api";
import HttpError from "src/utils/HttpError";

// fetch requests return thunk async function
export const fetchPaymentRequests =
  (
    status: ApiOperations["get-payments"]["parameters"]["query"]["status"]
  ): ThunkAction<Promise<any>, GeneralState, unknown, PaymentActions> =>
  async (dispatch, getState) => {
    const { adminPayments } = getState();
    const storeSlice =
      status === "pending" ? "pendingRequests" : "failedRequests";
    try {
      const query: ApiOperations["get-payments"]["parameters"]["query"] = {
        status: status,
        order: adminPayments[storeSlice].order,
        orderBy: adminPayments[storeSlice].orderBy,
        limit: adminPayments[storeSlice].limit,
        start: adminPayments[storeSlice].start,
      };
      if (adminPayments[storeSlice].paymentMethod) {
        query.filterBy = {
          paymentMethod: adminPayments[storeSlice].paymentMethod,
        };
      }
      const data = await API.adminPayments(query);
      if (status === "pending") {
        return dispatch({
          type: "admin/payments/updatePendingReqs",
          payload: data,
        });
      } else {
        return dispatch({
          type: "admin/payments/updateFailedReqs",
          payload: data,
        });
      }
    } catch (e) {
      const error = e as HttpError;
      if (error.statusCode === 404) {
        const { start, limit, size } = adminPayments[storeSlice];
        if (start - limit >= 0) {
          dispatch(updatePagination(start - limit, status));
        }
        if (status === "pending") {
          return dispatch({
            type: "admin/payments/updatePendingReqs",
            payload: {
              size: size,
              start: start,
              items: [],
            },
          });
        } else {
          return dispatch({
            type: "admin/payments/updateFailedReqs",
            payload: {
              size: size,
              start: start,
              items: [],
            },
          });
        }
      } else {
        return dispatch(addMessage(error.message, "danger", false));
      }
    }
  };

// update some query for payments requests and then update the list of item
export const updatePagination =
  (
    newStart: number,
    status: ApiOperations["get-payments"]["parameters"]["query"]["status"]
  ): ThunkAction<Promise<any>, GeneralState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({
      type: "admin/payments/updateReqsQuery",
      payload: { start: newStart, status: status },
    });
    return dispatch(fetchPaymentRequests(status));
  };

export const updateSortingOptions =
  (
    order: ApiOperations["get-payments"]["parameters"]["query"]["order"],
    orderBy: ApiOperations["get-payments"]["parameters"]["query"]["orderBy"],
    status: ApiOperations["get-payments"]["parameters"]["query"]["status"]
  ): ThunkAction<Promise<any>, GeneralState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({
      type: "admin/payments/updateReqsQuery",
      payload: { order: order, orderBy: orderBy, status: status },
    });
    return dispatch(fetchPaymentRequests(status));
  };

export const updatePendingRequestsFilter =
  (
    paymentMethod: AcceptedPaymentMethod
  ): ThunkAction<Promise<any>, GeneralState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({
      type: "admin/payments/selectRequest",
      payload: [],
    });
    dispatch({
      type: "admin/payments/updateReqsQuery",
      payload: {
        status: "pending",
        start: 0,
        paymentMethod: paymentMethod,
      },
    });

    return dispatch(fetchPaymentRequests("pending"));
  };

export const selectRequest =
  (
    id: ApiOperations["get-payments"]["responses"]["200"]["content"]["application/json"]["items"][0]["id"]
  ): ThunkAction<Promise<any>, GeneralState, unknown, PaymentActions> =>
  async (dispatch, getState) => {
    const {
      adminPayments: {
        pendingRequests: { selected },
      },
    } = getState();
    const pos = selected.indexOf(id);
    if (pos >= 0) {
      selected.splice(pos, 1);
    } else {
      selected.push(id);
    }
    dispatch({
      type: "admin/payments/selectRequest",
      payload: selected,
    });
  };

export const togglePaymentModal =
  (
    isOpen: boolean
  ): ThunkAction<Promise<any>, GeneralState, unknown, PaymentActions> =>
  async (dispatch) => {
    dispatch({
      type: "admin/payments/togglePaymentModal",
      payload: isOpen,
    });
  };

export const payMultiplePendingRequests =
  (): ThunkAction<Promise<any>, GeneralState, unknown, PaymentActions> =>
  async (dispatch, getState) => {
    const { adminPayments } = getState();
    const processingPayments: ProcessableRequest[] =
      adminPayments.pendingRequests.selected.map((req) => ({
        id: req.toString(),
        status: "pending",
      }));
    for (let i = 0; i < processingPayments.length; i++) {
      const {
        adminPayments: {
          pendingRequests: { processing },
        },
      } = getState();
      if (processing.abort) break;
      dispatch({
        type: "admin/payments/updateProcessRequests",
        payload: {
          items: processingPayments,
          status: `${i + 1}/${processingPayments.length} processing...`,
        },
      });
      try {
        await API.payRequests(processingPayments[i].id);
        processingPayments[i].status = "success";
      } catch (e) {
        const error = e as HttpError;
        console.error(e);
        processingPayments[i].status = "error";
        processingPayments[i].error = error;
      }
    }
    dispatch({
      type: "admin/payments/updateProcessRequests",
      payload: {
        items: processingPayments,
        status: "finished",
      },
    });
    dispatch({ type: "admin/payments/clearSelectedRequests" });
    dispatch(fetchPaymentRequests("pending"));
    dispatch(fetchPaymentRequests("failed"));
  };

export const stopMultipaymentProcess =
  (): ThunkAction<Promise<any>, GeneralState, unknown, PaymentActions> =>
  async (dispatch) => {
    dispatch({
      type: "admin/payments/stopMultipaymentProcess",
    });
  };

export const paySingleFailedRequest =
  (
    id: number
  ): ThunkAction<Promise<any>, GeneralState, unknown, PaymentActions> =>
  async (dispatch) => {
    const paymentId = id.toString();
    try {
      await API.payRequests(paymentId);
      dispatch({
        type: "admin/payments/setActionOutcome",
        payload: "success",
      });
    } catch (e) {
      console.error(e);
      dispatch({
        type: "admin/payments/setActionOutcome",
        payload: "error",
      });
    }
    dispatch(fetchPaymentRequests("failed"));
  };

export const toggleRetryModal =
  (
    isOpen: boolean,
    requestId?: number
  ): ThunkAction<Promise<any>, GeneralState, unknown, PaymentActions> =>
  async (dispatch) => {
    dispatch({
      type: "admin/payments/toggleRetryModal",
      payload: { isOpen, requestId },
    });
  };

export const deletePaymentRequest =
  (
    id: string
  ): ThunkAction<Promise<any>, GeneralState, unknown, PaymentActions> =>
  async (dispatch) => {
    try {
      await API.deleteRequest(id);
      dispatch({
        type: "admin/payments/setActionOutcome",
        payload: "success",
      });
    } catch (e) {
      console.error(e);
      dispatch({
        type: "admin/payments/setActionOutcome",
        payload: "error",
      });
    }
    dispatch(fetchPaymentRequests("failed"));
  };

export const toggleDeleteModal =
  (
    isOpen: boolean,
    requestId?: number
  ): ThunkAction<Promise<any>, GeneralState, unknown, PaymentActions> =>
  async (dispatch) => {
    dispatch({
      type: "admin/payments/toggleDeleteModal",
      payload: { isOpen, requestId },
    });
  };

export const setActionOutcome =
  (
    status?: "success" | "error"
  ): ThunkAction<Promise<any>, GeneralState, unknown, PaymentActions> =>
  async (dispatch) => {
    dispatch({
      type: "admin/payments/setActionOutcome",
      payload: status,
    });
  };
