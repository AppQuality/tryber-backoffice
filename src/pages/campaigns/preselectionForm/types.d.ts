interface AdditionalField {
  fieldId: string;
  question: string;
  type: string; // cuf_22 || text || select || multiselect || radio || gender || phone ||
  options?: string[];
}

interface CustomUserField extends AdditionalField {
  cufId: number;
  cufType: string;
  availableOptions?: ApiComponents["schemas"]["CustomUserFieldsDataOption"][];
  selectedOptions?: number[];
}

type PreselectionFormValues = {
  formTitle: string;
  fields: Array<AdditionalField | CustomUserField>;
};

interface CardDropProps {
  name: string;
}

interface DropResult {
  name: string;
}

type ProfileFieldType = "gender" | "phone" | "address";

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
