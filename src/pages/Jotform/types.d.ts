type JotformValues = {
  additional: { [key: string]: any };
};
interface CufField {
  fieldData: ApiComponents["schemas"]["CustomUserFieldsData"];
  checked: boolean;
}

interface FormElement {
  id: number;
  question: string;
  type: "select" | "multiselect" | "text";
  name: ApiComponents["schemas"]["TranslatablePage"];
  options?: ApiComponents["schemas"]["CustomUserFieldsDataOption"][];
}
