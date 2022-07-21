import {
  Card,
  Field,
  Select,
  Text,
} from "@appquality/appquality-design-system";
import { useAppSelector } from "src/store";

export const CufConfiguratorCard = () => {
  const { fields } = useAppSelector((state) => state.jotform);

  return (
    <Card title={"Additional fields configurator"} className="aq-mb-3">
      {fields?.map(
        (f) =>
          f.checked && (
            <div key={`configurator-${f.fieldData.id}`}>
              <Text className="aq-mb-2">
                <strong>{f.fieldData.name.it}</strong>
              </Text>
              <Field
                type="text"
                name={`additional.${f.fieldData.id}.question`}
                label="Question"
                placeholder="Write a question"
              />
              {f.fieldData.options && (
                <Select
                  name={`additional.${f.fieldData.id}.options`}
                  value={{ value: "", label: "" }}
                  label={"Options"}
                  options={f.fieldData.options.map((o) => {
                    return { value: o.id.toString(), label: o.name };
                  })}
                  isMulti
                />
              )}
            </div>
          )
      )}
    </Card>
  );
};
