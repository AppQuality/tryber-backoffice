import {
  ErrorMessage,
  FieldProps,
  FormGroup,
  Select,
} from "@appquality/appquality-design-system";

export const severityOptions = [
  {
    label: "Minor",
    value: "1",
  },
  {
    label: "Major",
    value: "2",
  },
  {
    label: "Positive",
    value: "3",
  },
  {
    label: "Observation",
    value: "4",
  },
];

const SeverityField = (fieldProps: FieldProps) => {
  const { form, field } = fieldProps;
  return (
    <FormGroup>
      <Select
        menuTargetQuery="body"
        options={severityOptions}
        label="Severity"
        name={field.name}
        value={field.value}
        onChange={(value) => form.setFieldValue(field.name, value)}
      />
      <ErrorMessage name={field.name} />
    </FormGroup>
  );
};

export default SeverityField;
