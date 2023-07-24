import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormValuesInterface } from "./UxDashboardForm";

interface UxDashboardState {
  selectedInsight?: FormValuesInterface["insights"][number];
}

export const initialState: UxDashboardState = {};

const selectionSlice = createSlice({
  name: "uxDashboard",
  initialState: initialState,
  reducers: {
    setSelectedInsight(
      state,
      action: PayloadAction<FormValuesInterface["insights"][number]>
    ) {
      state.selectedInsight = action.payload;
    },
    resetInsight(state) {
      state.selectedInsight = undefined;
    },
    reset() {
      return initialState;
    },
  },
});

const { actions, reducer } = selectionSlice;
export const { setSelectedInsight, resetInsight, reset } = actions;

export default reducer;
