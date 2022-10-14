import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectionState {
  selectedDevices: {
    [userId: string]: string;
  };
}

const initialState: SelectionState = {
  selectedDevices: {},
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
  },
});

const { actions, reducer } = selectionSlice;
export const { reset, checkUserDevice } = actions;
export default reducer;
