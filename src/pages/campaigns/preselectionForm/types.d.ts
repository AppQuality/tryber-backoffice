interface AdditionalField {
  fieldId: string;
  question: string;
  type: string; // cuf_22 || text || select || multiselect || radio || gender || phone_number ||
  name: string;
  options?: string[];
  shortTitle?: string;
}

interface CustomUserField extends AdditionalField {
  cufId: number;
  cufType: string;
  availableOptions?: ApiComponents["schemas"]["CustomUserFieldsDataOption"][];
  selectedOptions?: { label: string; value: string }[];
}

interface DragItem {
  field: AdditionalField;
  index: number;
}

type PreselectionFormValues = {
  formTitle: string;
  campaign?: SelectOptionType;
  fields: Array<AdditionalField | CustomUserField>;
};

interface CardDropProps {
  name: string;
}

interface DropResult {
  name: string;
}

type ProfileFieldType = "gender" | "phone_number" | "address";

interface ProfileField {
  fieldData: {
    id: ProfileFieldType;
    name: string;
    type: ProfileFieldType;
  };
  checked: boolean;
}

type CustomQuestionType = "select" | "multiselect" | "text" | "radio";

interface CustomQuestion {
  fieldData: {
    type: CustomQuestionType;
    id: string;
    options?: string[];
  };
}
