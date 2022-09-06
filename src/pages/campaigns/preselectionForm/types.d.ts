interface CufField {
  fieldData: ApiComponents["schemas"]["CustomUserFieldsData"];
  checked: boolean;
}
type PreselectionFormValues = {
  formTitle: string;
  questions: {
    [key: string | number]: {
      fieldId: string | number;
      title: string;
      type: string;
      options?:
        | string[]
        | ApiComponents["schemas"]["CustomUserFieldsDataOption"][];
    };
  };
};

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
