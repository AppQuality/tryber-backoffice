import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreselectionListState {
  search?: string;
  searchBy: SearchByType[];
}

const initialState: PreselectionListState = {
  searchBy: ["id", "name", "campaign_id"],
};

const campaignPreselectionListSlice = createSlice({
  name: "campaignPreselectionList",
  initialState: initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string | undefined>) {
      state.search = action.payload;
    },
    setSearchBy(state, action: PayloadAction<SearchByType[]>) {
      state.searchBy = action.payload;
    },
    resetList() {
      return initialState;
    },
  },
});

const { actions, reducer } = campaignPreselectionListSlice;
export const { setSearch, setSearchBy, resetList } = actions;
export default reducer;
