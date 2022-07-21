import { Card, Checkbox } from "@appquality/appquality-design-system";
import { useEffect, useState } from "react";
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
      d.fields?.forEach((f) => list.push({ checked: false, fieldsData: f }));
    });
    dispatch(setFields(list));
  }, [data]);

  return (
    <Card title={"Additional fields selection"} className="aq-mb-3">
      {fields.map((f, i) => (
        <Checkbox
          key={`${f.fieldsData.id}-${f.fieldsData.name.it}`}
          id={`${f.fieldsData.id}-${f.fieldsData.name.it}`}
          label={f.fieldsData.name.it}
          checked={f.checked}
          onChange={() => {
            const newFields = [...fields];
            newFields[i] = {
              checked: !f.checked,
              fieldsData: f.fieldsData,
            };
            dispatch(setFields(newFields));
          }}
          className="aq-mb-2"
        />
      ))}
    </Card>
  );
};
