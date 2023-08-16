import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormInsight } from "./UxForm/FormProvider";

interface UxDashboardState {
  selectedInsight?: FormInsight;
  insightIndex: number;
  currentStep: number;
  isModalOpen: boolean;
}

export const initialState: UxDashboardState = {
  insightIndex: 0,
  currentStep: 0,
  isModalOpen: false,
};

const selectionSlice = createSlice({
  name: "uxDashboard",
  initialState: initialState,
  reducers: {
    setSelectedInsight(state, action: PayloadAction<FormInsight>) {
      state.selectedInsight = action.payload;
    },
    setInsightIndex(state, action: PayloadAction<number>) {
      state.insightIndex = action.payload;
    },
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
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
  setModalOpen,
  resetInsight,
  reset,
} = actions;

export default reducer;
