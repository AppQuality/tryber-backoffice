import {
  FieldProps,
  FormGroup,
  Select,
} from "@appquality/appquality-design-system";
import { useMemo } from "react";
import { FormValuesInterface } from "../../FormProvider";

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

const SeverityField = ({
  form,
  field,
}: FieldProps<FormValuesInterface["insights"][number]["severity"]>) => {
  const mapSeverityToSelectValue = useMemo(() => {
    return typeof field.value === "object" && field.value !== null
      ? { label: field.value.name, value: field.value.id.toString() }
      : { label: "" };
  }, [field.value]);
  return (
    <FormGroup>
      <Select
        menuTargetQuery="body"
        options={severityOptions}
        placeholder="Seleziona la seveerity"
        label="Severity"
        name={field.name}
        value={mapSeverityToSelectValue}
        onChange={(value) => {
          if (!value || typeof value.value === "undefined") {
            form.setFieldValue(field.name, undefined);
            return;
          }
          form.setFieldValue(field.name, {
            name: value.label,
            id: parseInt(value.value, 10),
          });
        }}
      />
    </FormGroup>
  );
};

export default SeverityField;
