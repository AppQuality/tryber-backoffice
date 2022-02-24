import * as actionTypes from "./actionTypes";
import { v4 as uuidv4 } from "uuid";
import { aqBootstrapTheme } from "@appquality/appquality-design-system";
import { ReactNode } from "react";

export function addMessage(
  message: ReactNode,
  type: keyof typeof aqBootstrapTheme.palette,
  expire: number | false = 3
) {
  const uuid = uuidv4();
  const data: SiteWideMessageItem = {
    message,
    uuid,
    type,
  };
  if (expire) data.expire = expire;
  const action: SiteWideMessagesAction = {
    type: actionTypes.ADD_MESSAGE,
    data,
  };

  return (dispatch: SiteWideMessagesDispatchType) => {
    if (expire)
      setTimeout(() => {
        dispatch({ type: actionTypes.REMOVE_MESSAGE, data: uuid });
      }, expire * 1000);

    return dispatch(action);
  };
}
export function removeMessage({ uuid }: SiteWideMessageRemoveType) {
  const action: SiteWideMessagesRemoveAction = {
    type: actionTypes.REMOVE_MESSAGE,
    data: uuid,
  };

  return (dispatch: SiteWideMessagesDispatchType) => dispatch(action);
}
