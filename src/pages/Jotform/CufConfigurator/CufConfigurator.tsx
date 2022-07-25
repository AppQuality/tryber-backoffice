import { Button, Form, Formik } from "@appquality/appquality-design-system";
import { useAppSelector } from "src/store";
import { CufConfiguratorCard } from "./CufConfiguratorCard";
import { FormikProps } from "formik";
import * as yup from "yup";
import FocusError from "./FocusError";
import { FormTitleCard } from "./FormTitleCard";
import { useEffect } from "react";

const initialJotformValues: JotformValues = {
  formTitle: "",
  additional: {},
};

export const CufConfigurator = () => {
  const { list } = useAppSelector((state) => state.jotform);

  useEffect(() => {
    list.forEach((l, i) => {
      initialJotformValues.additional[i] = {
        cufId: l.id,
        title: "",
        type: l.type,
        ...(l.options ? { options: [] } : undefined),
      };
    });
  }, [list]);

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
          list.forEach((f) => {
            if (values.additional[k].cufId === f.id) {
              if (
                values.additional[k].options?.some((o: any) => o.value === "-1")
              ) {
                toBeSendValues.push({
                  ...values.additional[k],
                  options: f.options,
                });
              } else toBeSendValues.push(values.additional[k]);
            }
          });
        });
        console.log(values.formTitle);
        console.log(toBeSendValues);
      }}
    >
      {(formikProps: FormikProps<JotformValues>) => {
        return (
          <Form id="jotform">
            <FormTitleCard />
            <CufConfiguratorCard />
            <Button
              className="aq-mt-1 aq-mb-4"
              type="primary"
              htmlType="submit"
              size="block"
              flat
              disabled={!list.length}
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
