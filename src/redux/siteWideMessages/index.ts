import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { addMessage, removeMessage } from "./actionCreators";

export default () => {
  const messages: Array<SiteWideMessageItem> = useSelector(
    (state: GeneralState) => state.messages.messages,
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  return {
    messages,
    add: ({ message, type, expire }: SiteWideMessageAddType) =>
      dispatch(addMessage(message, type, expire)),
    remove: ({ uuid }: SiteWideMessageRemoveType) =>
      dispatch(removeMessage({ uuid })),
  };
};
