import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormValuesInterface } from "./UxForm/FormProvider";

interface UxDashboardState {
  selectedInsight?: FormValuesInterface["insights"][number];
  insightIndex: number;
  currentStep: number;
}

export const initialState: UxDashboardState = {
  insightIndex: 0,
  currentStep: 0,
};

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
    setInsightIndex(state, action: PayloadAction<number>) {
      state.insightIndex = action.payload;
    },
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
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
export const {
  setSelectedInsight,
  setInsightIndex,
  setCurrentStep,
  resetInsight,
  reset,
} = actions;

export default reducer;
