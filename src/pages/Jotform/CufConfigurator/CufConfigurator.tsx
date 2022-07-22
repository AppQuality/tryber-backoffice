import { Button, Form, Formik } from "@appquality/appquality-design-system";
import { useAppSelector } from "src/store";
import { CufConfiguratorCard } from "./CufConfiguratorCard";
import { FormikProps } from "formik";
import * as yup from "yup";
import FocusError from "./FocusError";

const initialJotformValues: JotformValues = {
  additional: {},
};

export const CufConfigurator = () => {
  const { fields } = useAppSelector((state) => state.jotform);

  fields.forEach(
    (f, i) =>
      (initialJotformValues.additional[i] = {
        id: f.fieldData.id,
        question: "",
        ...(f.fieldData.options ? { options: [] } : undefined),
      })
  );

  const validationSchema = {
    additional: yup.object(),
  };

  return (
    <Formik
      initialValues={initialJotformValues}
      validationSchema={yup.object(validationSchema)}
      onSubmit={async (values, helpers) => {
        console.log(values);
      }}
    >
      {(formikProps: FormikProps<JotformValues>) => {
        return (
          <Form id="jotform">
            <CufConfiguratorCard />
            <Button
              className="aq-mt-1 aq-mb-2"
              type="primary"
              htmlType="submit"
              size="block"
              flat
              disabled={!fields.some((f) => f.checked)}
            >
              Submit
            </Button>
            <FocusError />
          </Form>
        );
      }}
    </Formik>
  );
};
