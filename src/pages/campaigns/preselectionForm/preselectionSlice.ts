import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreselectionFormState {
  profileFieldsList: ProfileField[];
  cufList: CufField[];
  newFieldsList: object[];
  selectedFields: Array<ProfileField | CufField>;
}

const initialState: PreselectionFormState = {
  profileFieldsList: [
    {
      fieldData: {
        id: "gender",
        type: "gender",
        name: "Gender",
      },
      checked: false,
    },
    {
      fieldData: {
        id: "phone",
        type: "phone",
        name: "Phone Number",
      },
      checked: false,
    },
    {
      fieldData: {
        id: "address",
        type: "address",
        name: "Address",
      },
      checked: false,
    },
  ],
  cufList: [],
  newFieldsList: [],
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
    resetForm() {
      return initialState;
    },
  },
});

const { actions, reducer } = campaignPreselectionSlice;
export const { resetForm, toggleProfileField, setCufList, toggleCufField } =
  actions;
export default reducer;
