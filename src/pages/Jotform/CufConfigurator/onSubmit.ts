import { FormikHelpers } from "formik";
import { CustomUserFieldsData } from "src/services/tryberApi";

export const submitValues = (
  values: JotformValues,
  helpers: FormikHelpers<JotformValues>,
  list: CustomUserFieldsData[]
) => {
  let toBeSendValues: FormElement[] = [];
  const keys = Object.keys(values.additional);
  list.forEach((l, i) => {
    keys.forEach((k) => {
      if (values.additional[k].cufId === l.id) {
        if (values.additional[k].options?.some((o: any) => o.value === "-1")) {
          toBeSendValues.push({
            ...values.additional[k],
            options: l.options,
          });
        } else toBeSendValues.push(values.additional[k]);
      }
    });
  });
  console.log(values.formTitle);
  console.log(toBeSendValues);
};
