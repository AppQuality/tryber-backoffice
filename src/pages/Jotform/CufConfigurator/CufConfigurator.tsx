import { Button, Form, Formik } from "@appquality/appquality-design-system";
import { useAppSelector } from "src/store";
import { CufConfiguratorCard } from "./CufConfiguratorCard";
import * as yup from "yup";
import FocusError from "./FocusError";
import { FormTitleCard } from "./FormTitleCard";
import { useEffect, useState } from "react";
import { submitValues } from "src/pages/Jotform/CufConfigurator/onSubmit";

export const CufConfigurator = () => {
  const [initialCufValues, setInitialCufValues] = useState<{
    [key: string]: any;
  }>({});

  const { list } = useAppSelector((state) => state.jotform);

  useEffect(() => {
    const newValues = {};
    list.forEach((l, i) => {
      // @ts-ignore
      newValues[i] = {
        cufId: l.id,
        title: "",
        type: l.type,
        ...(l.options ? { options: [] } : undefined),
      };
    });
    setInitialCufValues(newValues);
  }, [list]);

  const validationSchema = {
    additional: yup.object(),
  };

  return (
    <Formik
      initialValues={{
        formTitle: "",
        additional: initialCufValues,
      }}
      validationSchema={yup.object(validationSchema)}
      onSubmit={submitValues}
    >
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
    </Formik>
  );
};
