import { Field, Form, Formik } from "@appquality/appquality-design-system";
import * as Yup from "yup";

interface VideoPart {
  id: number;
  start: number;
  end: number;
  mediaId: number;
  description: string;
}
interface InsightSeverity {
  id: number;
  name: string;
}
interface InsightCluster {
  id: number;
  name: string;
}
export interface Insight {
  id: number;
  title: string;
  description: string;
  severity: InsightSeverity;
  cluster: string | InsightCluster[];
  videoPart: VideoPart[];
}

export const InsightForm = () => {
  const initialValues: Insight = {
    id: 0,
    title: "",
    description: "",
    severity: {
      id: 0,
      name: "",
    },
    cluster: "",
    videoPart: [],
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    severityId: Yup.number().required("Required"),
    clusterId: Yup.number().required("Required"),
    videoParts: Yup.array().of(
      Yup.object().shape({
        id: Yup.number().required("Required"),
        start: Yup.number().required("Required"),
        end: Yup.number().required("Required"),
        mediaId: Yup.number().required("Required"),
        description: Yup.string().required("Required"),
        order: Yup.number().required("Required"),
      })
    ),
  });

  const onSubmit = (values: Insight) => {
    alert(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form data-qa="insight-form">
        <Field name="title" label="Title" />
        <Field name="description" label="Description" />
        <Field name="severityId" label="Severity" />
      </Form>
    </Formik>
  );
};
