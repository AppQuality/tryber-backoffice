import { useAppDispatch } from "src/store";
import { useEffect } from "react";
import { Card, Checkbox } from "@appquality/appquality-design-system";
import { useGetCustomUserFieldsQuery } from "src/services/tryberApi";

export const CufSelectorCard = () => {
  const dispatch = useAppDispatch();
  const { data, error, isFetching, isLoading } = useGetCustomUserFieldsQuery();
  const fields: any[] = [];

  useEffect(() => {
    const list: CufField[] = [];
    data?.forEach((d) => {
      d.fields?.forEach((f) => list.push({ checked: false, fieldData: f }));
    });
  }, [data]);

  return (
    <Card title={"Custom User Fields"} className="aq-mb-3" shadow>
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
          }}
          className="aq-mb-2"
        />
      ))}
    </Card>
  );
};
