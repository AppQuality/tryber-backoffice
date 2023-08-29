import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormInsight } from "./UxForm/FormProvider";

interface UxDashboardState {
  selectedInsight?: FormInsight;
  insightIndex: number;
  currentStep: number;
  currentFormSection: number;
  isProgrammaticallyScrolling: boolean;
  isModalOpen: boolean;
}

export const initialState: UxDashboardState = {
  insightIndex: 0,
  currentStep: 0,
  currentFormSection: -199,
  isProgrammaticallyScrolling: false,
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
    setCurrentFormSection(state, action: PayloadAction<number>) {
      state.currentFormSection = action.payload;
    },
    setIsProgrammaticallyScrolling(state, action: PayloadAction<boolean>) {
      state.isProgrammaticallyScrolling = action.payload;
    },
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
    resetInsight(state) {
      state.selectedInsight = undefined;
    },
    reset(state) {
      state.selectedInsight = undefined;
      state.insightIndex = 0;
    },
  },
});

const { actions, reducer } = selectionSlice;
export const {
  setSelectedInsight,
  setInsightIndex,
  setCurrentStep,
  setCurrentFormSection,
  setIsProgrammaticallyScrolling,
  setModalOpen,
  resetInsight,
  reset,
} = actions;

export default reducer;
