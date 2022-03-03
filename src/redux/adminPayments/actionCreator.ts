import { ThunkAction } from "redux-thunk";
import HttpError from "src/utils/HttpError";
import { AnyAction } from "redux";
import API from "src/utils/api";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";

// fetch requests return thunk async function
export const fetchPaymentRequests =
  (
    status: ApiOperations["get-payments"]["parameters"]["query"]["status"]
  ): ThunkAction<Promise<any>, GeneralState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const { adminPayments } = getState();
    const storeSlice =
      status === "pending" ? "pendingRequests" : "failedRequests";
    try {
      const query = {
        status: status,
        order: adminPayments[storeSlice].order,
        orderBy: adminPayments[storeSlice].orderBy,
        limit: adminPayments[storeSlice].limit,
        start: adminPayments[storeSlice].start,
      };
      const action =
        status === "pending" ? "updatePendingReqs" : "updateFailedReqs";
      const data = await API.adminPayments(query);
      return dispatch({
        type: "admin/payments/" + action,
        payload: data,
      });
    } catch (e) {
      const error = e as HttpError;
      if (error.statusCode === 404) {
        const { start, limit } = adminPayments[storeSlice];
        if (start - limit >= 0) {
          dispatch(updatePagination(start - limit, status));
        }
      } else {
        console.error(e);
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

export const selectRequest =
  (
    id: ApiOperations["get-payments"]["responses"]["200"]["content"]["application/json"]["items"][0]["id"]
  ): ThunkAction<Promise<any>, GeneralState, unknown, AnyAction> =>
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

export const paySelectedRequests =
  (
    status: ApiOperations["get-payments"]["parameters"]["query"]["status"]
  ): ThunkAction<Promise<any>, GeneralState, unknown, PaymentActions> =>
  async (dispatch, getState) => {
    const { adminPayments } = getState();
    const storeSlice =
      status === "pending" ? "pendingRequests" : "failedRequests";
    const processingPayments: ProcessableRequest[] = adminPayments[
      storeSlice
    ].selected.map((req) => ({
      id: req.toString(),
      status: "pending",
    }));
    dispatch({
      type: "admin/payments/processRequests",
      payload: processingPayments,
    });

    for (let i = 0; i < processingPayments.length; i++) {
      try {
        await API.payRequests(processingPayments[i].id);
        processingPayments[i].status = "success";
      } catch (e) {
        const error = e as HttpError;
        console.error(e);
        processingPayments[i].status = "error";
        processingPayments[i].error = error;
      }
      dispatch({
        type: "admin/payments/processRequests",
        payload: processingPayments,
      });
    }
    dispatch(fetchPaymentRequests(status));
    return dispatch(togglePaymentModal(false));
  };
