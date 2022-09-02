import { useAppDispatch, useAppSelector } from "src/store";
import { useEffect } from "react";
import { Card, Checkbox, Text } from "@appquality/appquality-design-system";
import { useGetCustomUserFieldsQuery } from "src/services/tryberApi";
import {
  setCufList,
  toggleCufField,
} from "src/pages/campaigns/preselectionForm/preselectionSlice";

export const CufSelectorCard = () => {
  const dispatch = useAppDispatch();
  const { data, error, isFetching, isLoading } = useGetCustomUserFieldsQuery();
  const { cufList } = useAppSelector((state) => state.campaignPreselection);

  useEffect(() => {
    const list: CufField[] = [];
    data?.forEach((d) => {
      d.fields?.forEach((f) => list.push({ checked: false, fieldData: f }));
    });
    dispatch(setCufList(list));
  }, [data]);

  if (isLoading || isFetching) {
    return <Card>...loading</Card>;
  }
  if (error || !data) {
    return <Card>...error retrieving cuf fields</Card>;
  }
  return (
    <Card title={"Custom User Fields (CUF)"} className="aq-mb-3" shadow>
      <Text small color="danger" className="aq-mb-3">
        Attenzione, le risposte dell'utente a queste domande modificano il suo
        profilo su tryber.me
      </Text>
      {cufList.map((f) => (
        <Checkbox
          key={f.fieldData.id}
          id={f.fieldData.id.toString()}
          label={f.fieldData.name.it}
          checked={f.checked}
          onChange={() => {
            dispatch(toggleCufField(f.fieldData.id));
          }}
          className="aq-mb-2"
        />
      ))}
    </Card>
  );
};
