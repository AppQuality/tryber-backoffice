import {
  ErrorMessage,
  FieldProps,
  FormGroup,
  Select,
} from "@appquality/appquality-design-system";

export const clusterOptions = [
  {
    value: "1",
    label: "UC1: Cart",
  },
  {
    value: "2",
    label: "UC2: Login",
  },
  {
    value: "3",
    label: "UC3: Checkout",
  },
  {
    value: "4",
    label: "UC4: Search",
  },
];

const ClusterField = (fieldProps: FieldProps) => {
  const { form, field } = fieldProps;
  return (
    <FormGroup>
      <Select
        isMulti
        options={clusterOptions}
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
