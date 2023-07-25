import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikField,
} from "@appquality/appquality-design-system";
import { useAppSelector } from "src/store";
import * as Yup from "yup";
import SeverityField, { severityOptions } from "./fields/SeverityField";
import ClusterField, { clusterOptions } from "./fields/ClusterField";
import { FormValuesInterface } from "../UxDashboardForm";

interface VideoPart {
  id: number;
  start: number;
  end: number;
  mediaId: number;
  description: string;
}
export interface FormInsight {
  id: number;
  title: string;
  description: string;
  severity: SelectOptionType;
  cluster: SelectOptionType[];
  videoPart: VideoPart[];
}

const mapClusterToSelectOptionType = (
  cluster: FormValuesInterface["insights"][number]["cluster"]
): SelectOptionType[] => {
  if (cluster === "all") {
    return clusterOptions;
  }
  return clusterOptions.filter((option) =>
    cluster.find((cluster) => cluster.id.toString() === option.value)
  );
};

export const InsightForm = () => {
  const { selectedInsight } = useAppSelector((state) => state.uxDashboard);

  const initialValues: FormInsight = {
    id: selectedInsight?.id || 0,
    title: selectedInsight?.title || "",
    description: selectedInsight?.description || "",
    severity: severityOptions.find(
      (option) => option.value === selectedInsight?.severity?.id.toString()
    ) || {
      label: "",
      value: "",
    },
    cluster: mapClusterToSelectOptionType(selectedInsight?.cluster || []),
    videoPart: selectedInsight?.videoPart || [],
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    severity: Yup.object().shape({
      label: Yup.string().required("Required"),
      value: Yup.string().required("Required"),
    }),
    cluster: Yup.array().of(
      Yup.object().shape({
        label: Yup.string().required("Required"),
        value: Yup.string().required("Required"),
      })
    ),
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

  const onSubmit = (values: FormInsight) => {
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
          {(fieldProps: FieldProps) => <SeverityField {...fieldProps} />}
        </FormikField>
        <FormikField name="cluster">
          {(fieldProps: FieldProps) => <ClusterField {...fieldProps} />}
        </FormikField>
      </Form>
    </Formik>
  );
};
