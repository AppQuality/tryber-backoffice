import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikField,
  Select,
} from "@appquality/appquality-design-system";
import { useAppSelector } from "src/store";
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
  const { selectedInsight } = useAppSelector((state) => state.uxDashboard);

  const initialValues: Insight = {
    id: selectedInsight?.id || 0,
    title: selectedInsight?.title || "",
    description: selectedInsight?.description || "",
    severity: selectedInsight?.severity || {
      id: 0,
      name: "",
    },
    cluster: selectedInsight?.cluster || "",
    videoPart: selectedInsight?.videoPart || [],
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
        <FormikField name="severity">
          {({ field, form }: FieldProps) => (
            <Select
              options={[]}
              label="Severity"
              name="severity"
              value={field.value}
              onChange={(value) => form.setFieldValue(field.name, value)}
            />
          )}
        </FormikField>
      </Form>
    </Formik>
  );
};
