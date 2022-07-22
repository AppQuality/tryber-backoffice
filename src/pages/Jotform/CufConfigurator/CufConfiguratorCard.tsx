import { Card, Text } from "@appquality/appquality-design-system";
import { useAppSelector } from "src/store";
import { CufMultiselect } from "./CufMultiselect";
import { CufTextField } from "./CufTextField";

export const CufConfiguratorCard = () => {
  const { fields } = useAppSelector((state) => state.jotform);

  return (
    <Card title={"Additional fields configurator"} className="aq-mb-3">
      {fields?.map(
        (f, index) =>
          f.checked && (
            <div key={`configurator-${f.fieldData.id}`}>
              <Text className="aq-mb-2">
                <strong>{f.fieldData.name.it}</strong>
              </Text>
              <CufTextField
                name={`additional.${index}.question`}
                label={"Question"}
              />
              {f.fieldData.options && (
                <CufMultiselect
                  name={`additional.${index.toString()}.options`}
                  label={"Options"}
                  options={f.fieldData.options.map((o) => {
                    return { value: o.id.toString(), label: o.name };
                  })}
                />
              )}
            </div>
          )
      )}
    </Card>
  );
};
