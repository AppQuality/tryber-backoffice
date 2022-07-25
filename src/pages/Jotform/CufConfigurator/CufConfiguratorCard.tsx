import { Card, Text } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
import { useAppSelector } from "src/store";
import { CustomUserFieldsData } from "../../../services/tryberApi";
import { CufMultiselect } from "./CufMultiselect";
import { CufTextField } from "./CufTextField";

export const CufConfiguratorCard = () => {
  const { fields } = useAppSelector((state) => state.jotform);
  const [elements, setElements] = useState<CustomUserFieldsData[]>([]);

  useEffect(() => {
    fields?.some((f) => {
      const index = elements.findIndex(
        (element) => element.id === f.fieldData.id
      );
      if (f.checked && index === -1) {
        setElements([...elements, f.fieldData]);
        return true;
      } else {
        if (!f.checked && index !== -1) {
          const newElements = [...elements];
          newElements.splice(index, 1);
          setElements(newElements);
          return true;
        }
      }
      return undefined;
    });
  }, [fields]);

  return (
    <Card title={"Additional fields configurator"} className="aq-mb-3">
      {elements?.map((e) => (
        <div key={`configurator-${e.id}`}>
          <Text className="aq-mb-2">
            <strong>{e.name.it}</strong>
          </Text>
          <CufTextField name={`additional.${e.id}.title`} label={"Question"} />
          {e.options && (
            <CufMultiselect
              name={`additional.${e.id}.options`}
              label={"Options"}
              options={e.options.map((o) => {
                return { value: o.id.toString(), label: o.name };
              })}
            />
          )}
        </div>
      ))}
    </Card>
  );
};
