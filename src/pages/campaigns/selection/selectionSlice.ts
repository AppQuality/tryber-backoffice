import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectionState {}

const initialState: SelectionState = {};

const selectionSlice = createSlice({
  name: "selection",
  initialState: initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
});

const { actions, reducer } = selectionSlice;
export const { reset } = actions;
export default reducer;
