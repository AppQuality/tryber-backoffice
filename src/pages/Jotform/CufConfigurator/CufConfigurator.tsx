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
        type: f.fieldData.type,
        name: f.fieldData.name,
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
        let toBeSendValues: FormElement[] = [];
        const keys = Object.keys(values.additional);
        keys.forEach((k) => {
          fields.forEach((f) => {
            if (f.checked && values.additional[k].id === f.fieldData.id) {
              if (
                values.additional[k].options?.some((o: any) => o.value === "-1")
              ) {
                toBeSendValues.push({
                  ...values.additional[k],
                  options: f.fieldData.options,
                });
              } else toBeSendValues.push(values.additional[k]);
            }
          });
        });
        console.log(toBeSendValues);
      }}
    >
      {(formikProps: FormikProps<JotformValues>) => {
        return (
          <Form id="jotform">
            <CufConfiguratorCard />
            <Button
              className="aq-mt-1 aq-mb-4"
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
