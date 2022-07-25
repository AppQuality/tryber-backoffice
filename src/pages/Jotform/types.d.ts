type JotformValues = {
  formTitle: string;
  additional: { [key: string]: any };
};
interface CufField {
  fieldData: ApiComponents["schemas"]["CustomUserFieldsData"];
  checked: boolean;
}

interface FormElement {
  cufId: number;
  title: string;
  type: "select" | "multiselect" | "text";
  options?: ApiComponents["schemas"]["CustomUserFieldsDataOption"][];
}
