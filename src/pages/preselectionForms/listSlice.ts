import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreselectionListState {
  search?: string;
}

const initialState: PreselectionListState = {};

const campaignPreselectionListSlice = createSlice({
  name: "campaignPreselectionList",
  initialState: initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string | undefined>) {
      state.search = action.payload;
    },
    resetList() {
      return initialState;
    },
  },
});

const { actions, reducer } = campaignPreselectionListSlice;
export const { setSearch, resetList } = actions;
export default reducer;
