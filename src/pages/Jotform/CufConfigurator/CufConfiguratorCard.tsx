import { Card, Text } from "@appquality/appquality-design-system";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import { setList } from "../jotformSlice";
import { CufMultiselect } from "./CufMultiselect";
import { CufTextField } from "./CufTextField";

export const CufConfiguratorCard = () => {
  const dispatch = useAppDispatch();
  const { fields } = useAppSelector((state) => state.jotform);
  const { list } = useAppSelector((state) => state.jotform);

  useEffect(() => {
    fields?.some((f) => {
      const index = list.findIndex((element) => element.id === f.fieldData.id);
      if (f.checked && index === -1) {
        dispatch(setList([...list, f.fieldData]));
        return true;
      } else {
        if (!f.checked && index !== -1) {
          const newElements = [...list];
          newElements.splice(index, 1);
          dispatch(setList(newElements));
          return true;
        }
      }
      return undefined;
    });
  }, [fields]);

  return (
    <Card title={"Additional fields configurator"} className="aq-mb-3">
      {list?.map((e, i) => (
        <div key={`configurator-${e.id}`}>
          <Text className="aq-mb-2">
            <strong>{e.name.it}</strong>
          </Text>
          <CufTextField name={`additional.${i}.title`} label={"Question"} />
          {e.options && (
            <CufMultiselect
              name={`additional.${i}.options`}
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
