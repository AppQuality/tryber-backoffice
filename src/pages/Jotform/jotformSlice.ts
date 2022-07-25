import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomUserFieldsData } from "../../services/tryberApi";

interface JotformState {
  fields: CufField[];
  list: CustomUserFieldsData[];
}

const initialState: JotformState = {
  fields: [],
  list: [],
};

const jotformSlice = createSlice({
  name: "jotform",
  initialState: initialState,
  reducers: {
    setFields(state, action: PayloadAction<CufField[]>) {
      state.fields = action.payload;
    },
    setList(state, action: PayloadAction<CustomUserFieldsData[]>) {
      state.list = action.payload;
    },
  },
});

const { actions, reducer } = jotformSlice;
export const { setFields, setList } = actions;
export default reducer;
