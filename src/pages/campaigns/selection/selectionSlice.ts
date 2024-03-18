import { TableType } from "@appquality/appquality-design-system";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

type Filter =
  | PartialRecord<"testerIds", string>
  | PartialRecord<
      "os" | "gender" | "bughunting" | "metal" | `question_${number}`,
      string[]
    >;

interface SelectionState {
  selectedDevices: {
    [userId: string]: string;
  };
  currentPage: number;
  devicesPerPage: number;
  isConfirmModalOpen: boolean;
  isFormModalOpen: boolean;
  isSurveyModalOpen: boolean;
  questionsId: string[];
  tableColumns: TableType.Column[];
  disableApplyFilters: boolean;
  filters: {
    filterByInclude?: Filter;
    filterByExclude?: Record<"testerIds", string | undefined>;
    filterByAge?: {
      min?: number;
      max?: number;
    };
  };
}

export const initialState: SelectionState = {
  selectedDevices: {},
  currentPage: 1,
  devicesPerPage: 50,
  isConfirmModalOpen: false,
  isFormModalOpen: false,
  isSurveyModalOpen: false,
  questionsId: [],
  tableColumns: [],
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
    setFilters(
      state,
      action: PayloadAction<{
        filterByInclude?: Filter;
        filterByExclude?: Record<"testerIds", string | undefined>;
        filterByAge?: {
          min?: number;
          max?: number;
        };
      }>
    ) {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
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
    openFormModal(state) {
      state.isFormModalOpen = true;
    },
    closeFormModal(state) {
      state.isFormModalOpen = false;
    },
    openSurveyModal(state) {
      state.isSurveyModalOpen = true;
    },
    closeSurveyModal(state) {
      state.isSurveyModalOpen = false;
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
  openFormModal,
  closeFormModal,
  openSurveyModal,
  closeSurveyModal,
  setQuestionsId,
  setTableColumns,
  setDisableApplyFilters,
  setFilters,
} = actions;
export default reducer;
