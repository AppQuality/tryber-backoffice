import { Button, Form, Formik } from "@appquality/appquality-design-system";
import { useAppSelector } from "src/store";
import { CufConfiguratorCard } from "./CufConfiguratorCard";
import { FormikProps } from "formik";

const initialJotformValues: JotformValues = {
  additional: {},
};

export const CufConfigurator = () => {
  const { fields } = useAppSelector((state) => state.jotform);

  fields.forEach((f) => {
    if (f.checked)
      initialJotformValues.additional[f.fieldData.id] = {
        id: f.fieldData.id,
        type: f.fieldData.type,
        question: "",
        ...(f.fieldData.options ? { options: [] } : undefined),
      };
  });

  return (
    <Formik
      initialValues={initialJotformValues}
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
            >
              Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
