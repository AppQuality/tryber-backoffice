import {
  ErrorMessage,
  FieldProps,
  FormGroup,
  Text,
  Select,
} from "@appquality/appquality-design-system";

interface ClusterFieldProps extends FieldProps {
  options: SelectOptionType[];
}
export const clusterOptionGeneral = { label: "General", value: "all" };

const ClusterField = ({ options, ...fieldProps }: ClusterFieldProps) => {
  const { form, field } = fieldProps;

  return (
    <FormGroup>
      <Select
        menuTargetQuery="body"
        isMulti
        options={options}
        label="Cluster"
        name={field.name}
        value={field.value}
        onChange={(value) => {
          console.log(value);
          if (value.length === 0) {
            form.setFieldValue(field.name, []);
          }
          if (value.length === 1) {
            form.setFieldValue(field.name, value);
          }
          if (value.length > 1) {
            if (
              value.find(
                (v: SelectOptionType) => v.value === clusterOptionGeneral.value
              )
            ) {
              form.setFieldValue(field.name, clusterOptionGeneral);
            } else {
              form.setFieldValue(field.name, value);
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
