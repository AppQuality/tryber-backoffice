import { FormikValues, FormikHelpers } from "formik";
import { useAppSelector } from "src/store";

export const submitValues = (
  values: JotformValues,
  helpers: FormikHelpers<JotformValues>
) => {
  const { list } = useAppSelector((state) => state.jotform);
  let toBeSendValues: FormElement[] = [];
  const keys = Object.keys(values.additional);
  keys.forEach((k) => {
    const i = parseInt(k);
    list.forEach((f) => {
      if (values.additional[i] === f.id) {
        if (values.additional[i].options?.some((o: any) => o.value === "-1")) {
          toBeSendValues.push({
            ...values.additional[i],
            options: f.options,
          });
        } else toBeSendValues.push(values.additional[i]);
      }
    });
  });
  console.log(values.formTitle);
  console.log(toBeSendValues);
};
