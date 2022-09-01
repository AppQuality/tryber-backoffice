import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomUserFieldsData } from "src/services/tryberApi";

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
        type: "gender",
        name: "Gender",
      },
      checked: false,
    },
    {
      fieldData: {
        type: "phone",
        name: "Phone Number",
      },
      checked: false,
    },
    {
      fieldData: {
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
    resetForm() {
      return initialState;
    },
  },
});

const { actions, reducer } = campaignPreselectionSlice;
export const { resetForm, toggleProfileField } = actions;
export default reducer;
