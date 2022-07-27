import { Card, Checkbox } from "@appquality/appquality-design-system";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import { setFields } from "./jotformSlice";
import useCufData from "./useCufData";

export const CufListCard = () => {
  const dispatch = useAppDispatch();
  const { data } = useCufData();

  const { fields } = useAppSelector((state) => state.jotform);

  useEffect(() => {
    const list: CufField[] = [];
    data?.forEach((d) => {
      d.fields?.forEach((f) => list.push({ checked: false, fieldData: f }));
    });
    dispatch(setFields(list));
  }, [data]);

  return (
    <Card title={"Additional fields selection"} className="aq-mb-3" shadow>
      {fields.map((f, i) => (
        <Checkbox
          key={f.fieldData.id}
          id={f.fieldData.id.toString()}
          label={f.fieldData.name.it}
          checked={f.checked}
          onChange={() => {
            const newFields = [...fields];
            newFields[i] = {
              checked: !f.checked,
              fieldData: f.fieldData,
            };
            dispatch(setFields(newFields));
          }}
          className="aq-mb-2"
        />
      ))}
    </Card>
  );
};
