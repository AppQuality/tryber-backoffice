interface CufField {
  fieldData: ApiComponents["schemas"]["CustomUserFieldsData"];
  checked: boolean;
}

type ProfileFieldType = "gender" | "phone" | "address";

interface ProfileField {
  fieldData: { name: string; type: ProfilefieldType };
  checked: boolean;
}
