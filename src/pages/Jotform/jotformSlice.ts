import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JotformState {
  fields: CufField[];
}

const initialState: JotformState = {
  fields: [],
};

const jotformSlice = createSlice({
  name: "jotform",
  initialState: initialState,
  reducers: {
    setFields(state, action: PayloadAction<CufField[]>) {
      state.fields = action.payload;
    },
  },
});

const { actions, reducer } = jotformSlice;
export const { setFields } = actions;
export default reducer;
