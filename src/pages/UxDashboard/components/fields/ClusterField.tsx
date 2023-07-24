import {
  ErrorMessage,
  FieldProps,
  FormGroup,
  Select,
} from "@appquality/appquality-design-system";

interface ClusterFieldProps extends FieldProps {
  isLoading: boolean;
  options: SelectOptionType[];
}

const ClusterField = ({
  isLoading,
  options,
  ...fieldProps
}: ClusterFieldProps) => {
  const { form, field } = fieldProps;

  return (
    <FormGroup>
      <Select
        isLoading={isLoading}
        menuTargetQuery="body"
        isMulti
        options={options}
        label="Cluster"
        name={field.name}
        value={field.value}
        onChange={(value) => form.setFieldValue(field.name, value)}
      />
      <ErrorMessage name={field.name} />
    </FormGroup>
  );
};

export default ClusterField;
