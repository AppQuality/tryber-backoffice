import {
  ErrorMessage,
  FieldProps,
  FormGroup,
  Select,
} from "@appquality/appquality-design-system";

export const clusterOptions = [
  {
    label: "Cluster1",
    value: "cluster1",
  },
  {
    label: "Cluster2",
    value: "cluster2",
  },
  {
    label: "Cluster3",
    value: "cluster3",
  },
];

const ClusterField = (fieldProps: FieldProps) => {
  const { form, field } = fieldProps;
  return (
    <FormGroup>
      <Select
        options={clusterOptions}
        label="Cluster"
        name={field.name}
        value={
          clusterOptions.find((option) => option.value === field.value) || {
            label: "",
            value: "",
          }
        }
        onChange={(value) => form.setFieldValue(field.name, value)}
      />
      <ErrorMessage name={field.name} />
    </FormGroup>
  );
};

export default ClusterField;
