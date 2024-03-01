import { Form, Formik } from "@appquality/appquality-design-system";
import * as yup from "yup";

interface FormProviderInterface {
  children: React.ReactNode;
}

const FormProvider = ({ children }: FormProviderInterface) => {
  const initialValues = {
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
      onSubmit={() => alert("submit")}
    >
      <Form id="import-survey-modal">{children}</Form>
    </Formik>
  );
};
export default FormProvider;
