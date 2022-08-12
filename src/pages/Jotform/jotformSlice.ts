import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomUserFieldsData } from "../../services/tryberApi";

interface JotformState {
  creatorTid?: string;
  fields: CufField[];
  list: CustomUserFieldsData[];
  url?: string;
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
    setUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
    resetJotform() {
      return initialState;
    },
  },
});

const { actions, reducer } = jotformSlice;
export const { setFields, setList, setUrl, resetJotform } = actions;
export default reducer;
