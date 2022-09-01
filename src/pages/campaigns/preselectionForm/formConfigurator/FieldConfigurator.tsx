import { Card, Text } from "@appquality/appquality-design-system";
import { CufTextField } from "src/pages/Jotform/CufConfigurator/CufTextField";
import { CufMultiselect } from "src/pages/Jotform/CufConfigurator/CufMultiselect";
import React from "react";

export const FieldConfigurator: React.FC<{
  field: ProfileField | CufField;
}> = ({ field }) => {
  const name =
    typeof field.fieldData.name === "string"
      ? field.fieldData.name
      : field.fieldData.name.it;

  return (
    <Card title={name} className="aq-mb-3">
      <Text className="aq-mb-2">
        <strong>{name}</strong>
      </Text>
      <CufTextField
        name={`questions.${field.fieldData.id}.title`}
        label={"Question"}
      />
      {"options" in field.fieldData && field.fieldData.options && (
        <CufMultiselect
          name={`questions.${field.fieldData.id}.options`}
          label={"Options"}
          options={field.fieldData.options.map((o) => {
            return { value: o.id.toString(), label: o.name };
          })}
        />
      )}
    </Card>
  );
};
