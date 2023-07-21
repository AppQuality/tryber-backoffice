import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Insight } from "./components/InsightForm";

interface UxDashboardState {
  selectedInsight?: Insight; // id of the selected insight
}

export const initialState: UxDashboardState = {};

const selectionSlice = createSlice({
  name: "uxDashboard",
  initialState: initialState,
  reducers: {
    setSelectedInsight(state, action: PayloadAction<Insight>) {
      state.selectedInsight = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

const { actions, reducer } = selectionSlice;
export const { setSelectedInsight, reset } = actions;

export default reducer;
