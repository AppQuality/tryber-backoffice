import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormInsight } from "./UxForm/FormProvider";

type PublishStatus = "idle" | "publishing" | "success" | "failed";
interface UxDashboardState {
  selectedInsight?: FormInsight;
  insightIndex: number;
  currentStep: number;
  currentFormSection: number;
  isProgrammaticallyScrolling: boolean;
  isInsightModalOpen: boolean;
  isSentimentModalOpen: boolean;
  isSentimentDeleteModalOpen: boolean;
  publishStatus: PublishStatus;
}

export const initialState: UxDashboardState = {
  insightIndex: 0,
  currentStep: 0,
  currentFormSection: -199,
  isProgrammaticallyScrolling: false,
  isInsightModalOpen: false,
  isSentimentModalOpen: false,
  isSentimentDeleteModalOpen: false,
  publishStatus: "idle",
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
    setInsightModalOpen(state, action: PayloadAction<boolean>) {
      state.isInsightModalOpen = action.payload;
    },
    setSentimentModalOpen(state, action: PayloadAction<boolean>) {
      state.isSentimentModalOpen = action.payload;
    },
    setSentimentDeleteModalOpen(state, action: PayloadAction<boolean>) {
      state.isSentimentDeleteModalOpen = action.payload;
    },
    setPublishStatus(state, action: PayloadAction<PublishStatus>) {
      state.publishStatus = action.payload;
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
  setInsightModalOpen,
  setSentimentModalOpen,
  setSentimentDeleteModalOpen,
  setPublishStatus,
  resetInsight,
  reset,
} = actions;

export default reducer;
