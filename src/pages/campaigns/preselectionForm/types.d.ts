interface CufField {
  fieldData: ApiComponents["schemas"]["CustomUserFieldsData"];
  checked: boolean;
}
type PreselectionFormValues = {
  formTitle: string;
  questions: object[];
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
