import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PublishStatus = "idle" | "publishing" | "success" | "failed";
interface UxDashboardState {
  currentStep: number;
  currentFormSection: number;
  isProgrammaticallyScrolling: boolean;
  isInsightModalOpen: boolean;
  isSentimentModalOpen: boolean;
  isSentimentDeleteModalOpen: boolean;
  publishStatus: PublishStatus;
}

export const initialState: UxDashboardState = {
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
  },
});

const { actions, reducer } = selectionSlice;
export const {
  setCurrentStep,
  setCurrentFormSection,
  setIsProgrammaticallyScrolling,
  setInsightModalOpen,
  setSentimentModalOpen,
  setSentimentDeleteModalOpen,
  setPublishStatus,
} = actions;

export default reducer;
