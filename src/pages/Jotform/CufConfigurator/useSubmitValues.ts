import { FormikHelpers } from "formik";
import { useAppDispatch, useAppSelector } from "src/store";
import { setUrl } from "src/pages/Jotform/jotformSlice";
import { addMessage } from "src/redux/siteWideMessages/actionCreators";

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
          if (
            values.additional[k].options?.some((o: any) => o.value === "-1")
          ) {
            toBeSendValues.push({
              ...values.additional[k],
              options: l.options,
            });
          } else toBeSendValues.push(values.additional[k]);
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
