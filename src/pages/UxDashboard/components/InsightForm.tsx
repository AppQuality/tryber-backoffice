import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikField,
  TextareaField,
} from "@appquality/appquality-design-system";
import { useAppSelector } from "src/store";
import { FieldArray } from "formik";
import SeverityField from "./fields/SeverityField";
import ClusterField, { clusterOptionGeneral } from "./fields/ClusterField";
import { FormValuesInterface } from "../UxDashboardForm";
import {
  useGetCampaignsByCampaignClustersQuery,
  usePatchCampaignsByCampaignUxMutation,
} from "src/services/tryberApi";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Observations from "./fields/Observations";

export interface InsightFormValues {
  id: number;
  title: string;
  description: string;
  severity: SelectOptionType;
  cluster: SelectOptionType[];
  videoparts?: FormValuesInterface["insights"][number]["videoPart"];
}

export const InsightForm = () => {
  const { id } = useParams<{ id: string }>();
  const { insightIndex } = useAppSelector((state) => state.uxDashboard);
  const { data, isError } = useGetCampaignsByCampaignClustersQuery({
    campaign: id,
  });

  const clusterOptions = useMemo(() => {
    if (isError) {
      return [{ label: "Something went wrong retrieving clusters", value: "" }];
    }
    const options =
      data?.items.map((cluster) => ({
        label: cluster.name,
        value: cluster.id.toString(),
      })) || [];
    return [clusterOptionGeneral, ...options];
  }, [data, isError]);

  const mapClusterToSelectOptionType = (
    cluster?: FormValuesInterface["insights"][number]["cluster"]
  ): SelectOptionType[] => {
    if (!cluster) {
      return [];
    }
    if (cluster === "all") {
      return [clusterOptionGeneral];
    }
    return clusterOptions.filter((option) =>
      cluster.find((cluster) => cluster.id.toString() === option.value)
    );
  };

  return (
    <div data-qa="insight-form">
      <Field name={`insights[${insightIndex}].title`} label="Title" />
      <TextareaField
        name={`insights[${insightIndex}].description`}
        label="Description"
      />
      <FormikField name={`insights[${insightIndex}].severity`}>
        {(fieldProps: FieldProps) => <SeverityField {...fieldProps} />}
      </FormikField>
      <FormikField name={`insights[${insightIndex}].cluster`}>
        {(fieldProps: FieldProps) => (
          <ClusterField options={clusterOptions} {...fieldProps} />
        )}
      </FormikField>
      <Observations />
    </div>
  );
};
