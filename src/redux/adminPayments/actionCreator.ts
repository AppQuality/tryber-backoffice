import { ThunkAction } from "redux-thunk";
import * as messageActionTypes from "../siteWideMessages/actionTypes";
import HttpError from "src/utils/HttpError";
import { AnyAction } from "redux";
import API from "src/utils/api";

// fetch requests return thunk async function
export const fetchPaymentRequests =
  (
    status: ApiOperations["get-payments"]["parameters"]["query"]["status"]
  ): ThunkAction<Promise<any>, GeneralState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const { adminPayments } = getState();
    try {
      const storeSlice =
        status === "pending" ? "pendingRequests" : "failedRequests";
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
      if (error.statusCode !== 404) {
        console.error(e);
        return dispatch({
          type: messageActionTypes.ADD_MESSAGE,
          data: {
            message: error.message,
            type: "danger",
          },
        });
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
    ids: ApiOperations["get-payments"]["responses"]["200"]["content"]["application/json"]["items"][0]["id"][]
  ): ThunkAction<Promise<any>, GeneralState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({
      type: "admin/payments/selectRequest",
      payload: ids,
    });
  };

export const togglePaymentModal =
  (
    isOpen: boolean
  ): ThunkAction<Promise<any>, GeneralState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({
      type: "admin/payments/togglePaymentModal",
      payload: isOpen,
    });
  };

export const paySelectedRequests =
  (
    status: ApiOperations["get-payments"]["parameters"]["query"]["status"]
  ): ThunkAction<Promise<any>, GeneralState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const { adminPayments } = getState();
    try {
      const storeSlice =
        status === "pending" ? "pendingRequests" : "failedRequests";

      const paymentId = adminPayments[storeSlice].selected[0].toString();
      await API.payRequests(paymentId);
      dispatch({
        type: messageActionTypes.ADD_MESSAGE,
        data: {
          message: `Done payment with id ${paymentId}`,
          type: "success",
        },
      });
    } catch (e) {
      const error = e as HttpError;
      console.error(e);
      dispatch({
        type: messageActionTypes.ADD_MESSAGE,
        data: {
          message: `${error.statusCode} - ${error.message}`,
          type: "danger",
        },
      });
    }
    dispatch(selectRequest([]));
    dispatch(fetchPaymentRequests(status));
    return dispatch(togglePaymentModal(false));
  };
