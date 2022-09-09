import { FC, useEffect, useState } from "react";
import { Card, Checkbox, Text } from "@appquality/appquality-design-system";
import { useGetCustomUserFieldsQuery } from "src/services/tryberApi";
import { useFormikContext } from "formik";
import { useAppSelector } from "src/store";

export const CufSelectorCard: FC<{
  add: (newField: CustomUserField) => void;
  remove: (index: number) => void;
}> = ({ add, remove }) => {
  const { values } = useFormikContext<PreselectionFormValues>();
  const { data, error, isFetching, isLoading } = useGetCustomUserFieldsQuery();
  const [selected, setselected] = useState<number[]>([]);
  const [cufList, setCufList] = useState<
    ApiComponents["schemas"]["CustomUserFieldsData"][]
  >([]);
  const { loadedForm } = useAppSelector((state) => state.campaignPreselection);

  useEffect(() => {
    const list: ApiComponents["schemas"]["CustomUserFieldsData"][] = [];
    data?.forEach((d) => {
      d.fields?.forEach((f) => list.push(f));
    });
    setCufList(list);
  }, [data]);

  useEffect(() => {
    if (loadedForm?.fields && cufList) {
      const s: number[] = [];
      loadedForm.fields.forEach((f) => {
        const cufId = parseInt(f.type.replace("cuf_", ""));
        if (cufList.some((c) => c.id === cufId)) {
          s.push(cufId);
        }
      });
      setselected(s);
    }
  }, [loadedForm, cufList]);

  useEffect(() => {
    if (selected.length) {
      const newSelected = [...selected];
      selected.forEach((s, index) => {
        if (!values.fields.some((f) => "cufId" in f && f.cufId === s)) {
          newSelected.splice(index, 1);
        }
      });
      setselected(newSelected);
    }
  }, [values.fields.length]);

  if (isLoading || isFetching) {
    return <Card>...loading</Card>;
  }
  if (error || !data) {
    return <Card>...error retrieving cuf fields</Card>;
  }
  const toggleCuf = (id: number) => {
    if (selected.indexOf(id) >= 0) {
      // remove
      let indexOfFieldToRemove = -1;
      values.fields.some((field, index) => {
        if (field.fieldId === `cuf_${id}`) {
          indexOfFieldToRemove = index;
          return true;
        }
        return false;
      });
      if (indexOfFieldToRemove < 0) return; // todo: error message
      remove(indexOfFieldToRemove);
      selected.splice(selected.indexOf(id), 1);
      setselected(selected);
    } else {
      // add
      const cufToAdd = cufList.find((cuf) => cuf.id === id);
      if (!cufToAdd) return; // todo: error message
      add({
        fieldId: `cuf_${cufToAdd.id}`,
        type: `cuf_${cufToAdd.id}`,
        question: "",
        name: `${cufToAdd.name.it} - cuf_${cufToAdd.id} `,
        cufType: cufToAdd.type,
        cufId: cufToAdd.id,
        ...(cufToAdd.options
          ? {
              availableOptions: cufToAdd.options,
              selectedOptions: [],
            }
          : undefined),
      });
      setselected([...selected, id]);
    }
  };
  return (
    <Card title={"Custom User Fields (CUF)"} className="aq-mb-3" shadow>
      <Text small color="danger" className="aq-mb-3">
        Attenzione, le risposte dell'utente a queste domande modificano il suo
        profilo su tryber.me
      </Text>
      {cufList.map((f) => {
        const isChecked = selected.indexOf(f.id) >= 0;
        return (
          <Checkbox
            key={`${f.id}-${isChecked}`}
            id={f.id.toString()}
            label={f.name.it}
            checked={isChecked}
            disabled={isChecked}
            onChange={() => {
              toggleCuf(f.id);
            }}
            className="aq-mb-2"
          />
        );
      })}
    </Card>
  );
};
