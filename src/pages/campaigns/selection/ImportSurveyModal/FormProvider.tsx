import { Form, Formik } from "@appquality/appquality-design-system";
import { usePostJotformsByCampaignMutation } from "src/services/tryberApi";
import { useAppDispatch } from "src/store";
import * as yup from "yup";
import { closeSurveyModal } from "../selectionSlice";

interface FormProviderInterface {
  id: string;
  children: React.ReactNode;
}

export interface ImportSurveyValues {
  survey: string;
  testerIdQuestion: string;
}

const FormProvider = ({ id, children }: FormProviderInterface) => {
  const dispatch = useAppDispatch();
  const [importJotform] = usePostJotformsByCampaignMutation();
  const initialValues: ImportSurveyValues = {
    survey: "",
    testerIdQuestion: "",
  };
  const validationSchema = yup.object({
    survey: yup.string().required(),
    testerIdQuestion: yup.string().required(),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          await importJotform({
            campaign: id,
            body: {
              formId: values.survey,
              testerIdColumn: values.testerIdQuestion,
            },
          }).unwrap();
          dispatch(closeSurveyModal());
        } catch (e) {}
      }}
    >
      <Form id="import-survey-modal">{children}</Form>
    </Formik>
  );
};
export default FormProvider;
