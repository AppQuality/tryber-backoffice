import { Form, Formik } from "@appquality/appquality-design-system";

interface FormProviderInterface {
  children: React.ReactNode;
}

const FormProvider = ({ children }: FormProviderInterface) => {
  return (
    <Formik
      initialValues={{}}
      validationSchema={{}}
      onSubmit={() => alert("submit")}
    >
      <Form id="import-survey-modal">{children}</Form>
    </Formik>
  );
};
export default FormProvider;
