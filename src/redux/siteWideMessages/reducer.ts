import * as actionTypes from "./actionTypes";

const initialState: SiteWideMessagesState = {
  messages: [],
};

const reducer = (
  state: SiteWideMessagesState = initialState,
  action: SiteWideMessagesAction
): SiteWideMessagesState => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGE:
      if (!action.data) return state;
      return {
        ...state,
        messages: [...state.messages, action.data],
      };
    case actionTypes.REMOVE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(
          (item: any) => item.uuid !== action.data
        ),
      };
  }
  return state;
};

export default reducer;
