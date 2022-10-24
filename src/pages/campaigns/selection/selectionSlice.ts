import { TableType } from "@appquality/appquality-design-system";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { columns } from "./SelectionTable/columns";

interface SelectionState {
  selectedDevices: {
    [userId: string]: string;
  };
  currentPage: number;
  devicesPerPage: number;
  isConfirmModalOpen: boolean;
  questionsId: string[];
  tableColumns: TableType.Column[];
  disableApplyFilters: boolean;
  filters: { [key: string]: any };
}

export const initialState: SelectionState = {
  selectedDevices: {},
  currentPage: 1,
  devicesPerPage: 50,
  isConfirmModalOpen: false,
  questionsId: [],
  tableColumns: columns,
  disableApplyFilters: true,
  filters: {},
};

const selectionSlice = createSlice({
  name: "selection",
  initialState: initialState,
  reducers: {
    setQuestionsId(state, action: PayloadAction<string[]>) {
      state.questionsId = action.payload;
    },
    setTableColumns(state, action: PayloadAction<TableType.Column[]>) {
      state.tableColumns = action.payload;
    },
    setDisableApplyFilters(state, action: PayloadAction<boolean>) {
      state.disableApplyFilters = action.payload;
    },
    setFilters(state, action: PayloadAction<{ [key: string]: any }>) {
      state.filters = action.payload;
    },
    reset() {
      return initialState;
    },
    checkUserDevice(
      state,
      action: PayloadAction<{ userId: string; deviceId: string }>
    ) {
      state.selectedDevices[action.payload.userId] = action.payload.deviceId;
    },
    deselectDevice(state, action: PayloadAction<{ userId: string }>) {
      delete state.selectedDevices[action.payload.userId];
    },
    clearSelectedDevice(state) {
      state.selectedDevices = {};
    },
    changeTablePage(state, action: PayloadAction<{ newPage: number }>) {
      if (action.payload.newPage > 0)
        state.currentPage = action.payload.newPage;
    },
    openConfirmModal(state) {
      state.isConfirmModalOpen = true;
    },
    closeConfirmModal(state) {
      state.isConfirmModalOpen = false;
    },
  },
});

const { actions, reducer } = selectionSlice;
export const {
  reset,
  checkUserDevice,
  changeTablePage,
  deselectDevice,
  clearSelectedDevice,
  openConfirmModal,
  closeConfirmModal,
  setQuestionsId,
  setTableColumns,
  setDisableApplyFilters,
  setFilters,
} = actions;
export default reducer;
