import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { GetCampaignsFormsByFormIdApiResponse } from "../../../services/tryberApi";

interface PreselectionFormState {
  profileFieldsList: ProfileField[];
  cufList: CufField[];
  customQuestionsList: CustomQuestion[];
  selectedFields: Array<ProfileField | CufField | CustomQuestion>;
  isDragging: boolean;
  loadedForm?: GetCampaignsFormsByFormIdApiResponse;
}

const initialState: PreselectionFormState = {
  isDragging: false,
  profileFieldsList: [
    {
      fieldData: {
        id: "gender",
        type: "gender",
        name: "Genere",
      },
      checked: false,
    },
    {
      fieldData: {
        id: "phone",
        type: "phone",
        name: "Numero di Telefono",
      },
      checked: false,
    },
    {
      fieldData: {
        id: "address",
        type: "address",
        name: "Città e Nazione di residenza",
      },
      checked: false,
    },
  ],
  cufList: [],
  customQuestionsList: [],
  selectedFields: [],
};

const campaignPreselectionSlice = createSlice({
  name: "campaignPreselection",
  initialState: initialState,
  reducers: {
    setDraggingField(state, action: PayloadAction<boolean>) {
      state.isDragging = action.payload;
    },
    toggleProfileField(state, action: PayloadAction<ProfileFieldType>) {
      state.profileFieldsList = state.profileFieldsList.map((field) => {
        if (field.fieldData.type === action.payload) {
          field.checked = !field.checked;
          if (field.checked) {
            state.selectedFields.push(field);
          } else {
            state.selectedFields = state.selectedFields.filter(
              (field) => field.fieldData.type !== action.payload
            );
          }
        }
        return field;
      });
    },
    setCufList(state, action: PayloadAction<CufField[]>) {
      state.cufList = action.payload;
    },
    toggleCufField(state, action: PayloadAction<number>) {
      state.cufList = state.cufList.map((field) => {
        if (field.fieldData.id === action.payload) {
          field.checked = !field.checked;
          if (field.checked) {
            state.selectedFields.push(field);
          } else {
            state.selectedFields = state.selectedFields.filter(
              (field) => field.fieldData.id !== action.payload
            );
          }
        }
        return field;
      });
    },
    addCustomQuestion(state, action: PayloadAction<CustomQuestionType>) {
      const newQuestion = {
        fieldData: {
          id: uuidv4(),
          type: action.payload,
          ...(action.payload !== "text"
            ? { options: ["option 1", "option 2"] }
            : undefined),
        },
      };
      state.customQuestionsList.push(newQuestion);
      state.selectedFields.push(newQuestion);
    },
    removeCustomQuestion(state, action: PayloadAction<string>) {
      state.customQuestionsList = state.customQuestionsList.filter(
        (question) => question.fieldData.id !== action.payload
      );
      state.selectedFields = state.selectedFields.filter(
        (question) => question.fieldData.id !== action.payload
      );
    },
    setLoadedForm(
      state,
      action: PayloadAction<GetCampaignsFormsByFormIdApiResponse>
    ) {
      state.loadedForm = action.payload;
    },
    resetForm() {
      return initialState;
    },
  },
});

const { actions, reducer } = campaignPreselectionSlice;
export const {
  resetForm,
  toggleProfileField,
  setCufList,
  toggleCufField,
  setDraggingField,
  setLoadedForm,
} = actions;
export default reducer;
