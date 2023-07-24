import {
  Button,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikField,
  TextareaField,
} from "@appquality/appquality-design-system";
import { useAppSelector } from "src/store";
import * as Yup from "yup";
import SeverityField, { severityOptions } from "./fields/SeverityField";
import ClusterField from "./fields/ClusterField";
import { FormValuesInterface } from "../UxDashboardForm";
import { useGetCampaignsByCampaignClustersQuery } from "src/services/tryberApi";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

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

export const InsightForm = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedInsight } = useAppSelector((state) => state.uxDashboard);
  const { data, isLoading, isError } = useGetCampaignsByCampaignClustersQuery({
    campaign: id,
  });

  const clusterOptions = useMemo(() => {
    if (isLoading) {
      return [];
    }
    if (isError) {
      return [{ label: "Something went wrong retrieving clusters", value: "" }];
    }
    return (
      data?.items.map((cluster) => ({
        label: cluster.name,
        value: cluster.id.toString(),
      })) || []
    );
  }, [data, isLoading, isError]);

  const mapClusterToSelectOptionType = (
    cluster?: FormValuesInterface["insights"][number]["cluster"]
  ): SelectOptionType[] => {
    if (!cluster) {
      return [];
    }
    if (cluster === "all") {
      return clusterOptions;
    }
    return clusterOptions.filter((option) =>
      cluster.find((cluster) => cluster.id.toString() === option.value)
    );
  };

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
    cluster: mapClusterToSelectOptionType(selectedInsight?.cluster),
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
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form data-qa="insight-form">
        <Field name="title" label="Title" />
        <TextareaField name="description" label="Description" />
        <FormikField name="severity">
          {(fieldProps: FieldProps) => <SeverityField {...fieldProps} />}
        </FormikField>
        <FormikField name="cluster">
          {(fieldProps: FieldProps) => (
            <ClusterField
              isLoading={isLoading}
              options={clusterOptions}
              {...fieldProps}
            />
          )}
        </FormikField>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </Formik>
  );
};
