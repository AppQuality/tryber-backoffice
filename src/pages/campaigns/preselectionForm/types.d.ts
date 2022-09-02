interface CufField {
  fieldData: ApiComponents["schemas"]["CustomUserFieldsData"];
  checked: boolean;
}
type PreselectionFormValues = {
  formTitle: string;
  questions: { [key: string]: any };
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
  };
}
