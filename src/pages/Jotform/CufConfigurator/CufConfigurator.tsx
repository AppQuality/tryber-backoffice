import { Button, Form, Formik } from "@appquality/appquality-design-system";
import { useAppSelector } from "src/store";
import { CufConfiguratorCard } from "./CufConfiguratorCard";
import { FormikProps } from "formik";
import * as yup from "yup";
import FocusError from "./FocusError";
import { FormTitleCard } from "./FormTitleCard";
import { useSubmitValues } from "./useSubmitValues";

const initialJotformValues: JotformValues = {
  formTitle: "",
  additional: {},
};

export const CufConfigurator = () => {
  const { list, fields } = useAppSelector((state) => state.jotform);

  fields.forEach(
    (f) =>
      (initialJotformValues.additional[f.fieldData.id] = {
        cufId: f.fieldData.id,
        title: "",
        type: f.fieldData.type,
        ...(f.fieldData.options ? { options: [] } : undefined),
      })
  );

  const validationSchema = {
    additional: yup.object(),
  };

  const { submitValues } = useSubmitValues();

  return (
    <Formik
      initialValues={initialJotformValues}
      validationSchema={yup.object(validationSchema)}
      onSubmit={submitValues}
    >
      {(formikProps: FormikProps<JotformValues>) => {
        return (
          <Form id="jotform">
            <FormTitleCard />
            <CufConfiguratorCard />
            <Button
              className="aq-mt-1 aq-mb-4"
              kind="primary"
              type="submit"
              size="block"
              flat
              disabled={!list.length || formikProps.isSubmitting}
            >
              {formikProps.isSubmitting ? "...wait" : "Submit"}
            </Button>
            <FocusError />
          </Form>
        );
      }}
    </Formik>
  );
};
