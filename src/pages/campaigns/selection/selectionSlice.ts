import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectionState {
  disableApplyFilters: boolean;
}

const initialState: SelectionState = {
  disableApplyFilters: true,
};

const selectionSlice = createSlice({
  name: "selection",
  initialState: initialState,
  reducers: {
    setDisableApplyFilters(state, action: PayloadAction<boolean>) {
      state.disableApplyFilters = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

const { actions, reducer } = selectionSlice;
export const { setDisableApplyFilters, reset } = actions;
export default reducer;
