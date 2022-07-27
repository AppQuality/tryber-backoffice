import { FormikHelpers } from "formik";
import { useAppDispatch, useAppSelector } from "src/store";
import { setUrl } from "src/pages/Jotform/jotformSlice";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";
import { sortArrayOfObjectsByField } from "./sortArrayOfObjectsByField";

export const useSubmitValues = () => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.jotform);
  const submitValues = async (
    values: JotformValues,
    helpers: FormikHelpers<JotformValues>
  ) => {
    helpers.setSubmitting(true);
    let toBeSendValues: FormElement[] = [];
    const keys = Object.keys(values.additional);
    list.forEach((l) => {
      keys.forEach((k) => {
        if (values.additional[k].cufId === l.id) {
          const selectedOptions = values.additional[k].options?.some(
            (o: any) => o.value === "-1"
          )
            ? l.options
            : values.additional[k].options?.map((o: any) => ({
                id: o.value,
                name: o.label,
              }));
          const sortedOptions = sortArrayOfObjectsByField(
            "name",
            selectedOptions
          );
          toBeSendValues.push({
            ...values.additional[k],
            ...(sortedOptions ? { options: sortedOptions } : undefined),
          });
        }
      });
    });
    try {
      const response = await fetch(`${process.env.REACT_APP_POST_JOTFORM}`, {
        body: JSON.stringify({
          title: values.formTitle,
          questions: toBeSendValues,
        }),
        method: "POST",
      });
      const body = await response.json();
      if (body.error) throw new Error(body.message);
      dispatch(setUrl(body.url));
    } catch (err) {
      if (err instanceof Error) {
        dispatch(addMessage(err.message, "danger", false));
      } else {
        dispatch(
          addMessage(
            "Unexpected error: see console for more info",
            "danger",
            false
          )
        );
        console.error(err);
      }
    }
    helpers.setSubmitting(false);
  };
  return { submitValues };
};
