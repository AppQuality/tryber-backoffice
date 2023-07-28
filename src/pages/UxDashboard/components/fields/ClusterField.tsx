import {
  ErrorMessage,
  FieldProps,
  FormGroup,
  Text,
  Select,
} from "@appquality/appquality-design-system";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetCampaignsByCampaignClustersQuery } from "src/services/tryberApi";
import { FormValuesInterface } from "../../UxForm/FormProvider";

const clusterOptionGeneral = { label: "General", value: "all" };

const ClusterField = ({
  form,
  field,
}: FieldProps<FormValuesInterface["insights"][number]["cluster"]>) => {
  const { id } = useParams<{ id: string }>();
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

  const mapClusterToSelectOptionType = useMemo(() => {
    if (!field.value) {
      return { label: "Select Cluster" };
    }
    if (typeof field.value === "string") {
      return clusterOptionGeneral;
    }
    return field.value.map((cluster) => ({
      label: cluster.name,
      value: cluster.id.toString(),
    }));
  }, [field.value]);

  return (
    <FormGroup>
      <Select
        menuTargetQuery="body"
        isMulti
        options={clusterOptions}
        label="Cluster"
        name={field.name}
        value={mapClusterToSelectOptionType}
        onChange={(value) => {
          if (value.length === 0) {
            form.setFieldValue(field.name, []);
          }
          if (value.length > 0) {
            if (
              value.find(
                (v: SelectOptionType) => v.value === clusterOptionGeneral.value
              )
            ) {
              form.setFieldValue(field.name, clusterOptionGeneral.value);
            } else {
              form.setFieldValue(
                field.name,
                value.map((item: SelectOptionType) => {
                  return item.value
                    ? { id: parseInt(item.value, 10), name: item.label }
                    : undefined;
                })
              );
            }
          }
        }}
      />
      <Text small className="aq-mt-1 aq-text-primaryVariant">
        Select one or more clusters, you can also select the General cluster to
        target all clusters.
      </Text>
      <ErrorMessage name={field.name} />
    </FormGroup>
  );
};

export default ClusterField;
