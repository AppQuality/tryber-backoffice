import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectionState {
  selectedDevices: {
    [userId: string]: string;
  };
  currentPage: number;
  devicesPerPage: number;
}

const initialState: SelectionState = {
  selectedDevices: {},
  currentPage: 1,
  devicesPerPage: 50,
};

const selectionSlice = createSlice({
  name: "selection",
  initialState: initialState,
  reducers: {
    reset() {
      return initialState;
    },
    checkUserDevice(
      state,
      action: PayloadAction<{ userId: string; deviceId: string }>
    ) {
      state.selectedDevices[action.payload.userId] = action.payload.deviceId;
    },
    changeTablePage(state, action: PayloadAction<{ newPage: number }>) {
      if (action.payload.newPage > 0)
        state.currentPage = action.payload.newPage;
    },
  },
});

const { actions, reducer } = selectionSlice;
export const { reset, checkUserDevice, changeTablePage } = actions;
export default reducer;
