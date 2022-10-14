import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectionState {
  questionsId: number[];
}

const initialState: SelectionState = {
  questionsId: [],
};

const selectionSlice = createSlice({
  name: "selection",
  initialState: initialState,
  reducers: {
    setQuestionsId(state, action: PayloadAction<number[]>) {
      state.questionsId = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

const { actions, reducer } = selectionSlice;
export const { setQuestionsId, reset } = actions;
export default reducer;
