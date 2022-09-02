import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreselectionFormState {
  profileFieldsList: ProfileField[];
  cufList: CufField[];
  customQuestionsList: CustomQuestion[];
  selectedFields: Array<ProfileField | CufField | CustomQuestion>;
}

const initialState: PreselectionFormState = {
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
          id: `custom-question-${state.customQuestionsList.length}`,
          type: action.payload,
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
  addCustomQuestion,
  removeCustomQuestion,
} = actions;
export default reducer;
