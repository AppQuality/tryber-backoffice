import { useEffect, useState } from "react";
import { Card, Checkbox, Text } from "@appquality/appquality-design-system";
import { useGetCustomUserFieldsQuery } from "src/services/tryberApi";
import { useFormikContext } from "formik";

export const CufSelectorCard: React.FC<{
  add: (newField: CustomUserField) => void;
  remove: (index: number) => void;
}> = ({ add, remove }) => {
  const { values } = useFormikContext<PreselectionFormValues>();
  const { data, error, isFetching, isLoading } = useGetCustomUserFieldsQuery();
  const [selected, setselected] = useState<number[]>([]);
  const [cufList, setCufList] = useState<
    ApiComponents["schemas"]["CustomUserFieldsData"][]
  >([]);

  useEffect(() => {
    const list: ApiComponents["schemas"]["CustomUserFieldsData"][] = [];
    data?.forEach((d) => {
      d.fields?.forEach((f) => list.push(f));
    });
    setCufList(list);
  }, [data]);

  if (isLoading || isFetching) {
    return <Card>...loading</Card>;
  }
  if (error || !data) {
    return <Card>...error retrieving cuf fields</Card>;
  }
  const toggleCuf = (id: number) => {
    if (selected.indexOf(id) >= 0) {
      // remove
      const indexOfFieldToRemove = values.fields.reduce(
        (previousValue, field, currentIndex) => {
          return field.fieldId === `cuf_${id}` ? currentIndex : previousValue;
        },
        -1
      );
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
        question: "",
        type: `${cufToAdd.name.it} - cuf_${cufToAdd.id} `,
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
      {cufList.map((f) => (
        <Checkbox
          key={f.id}
          id={f.id.toString()}
          label={f.name.it}
          checked={false}
          onChange={() => {
            toggleCuf(f.id);
          }}
          className="aq-mb-2"
        />
      ))}
    </Card>
  );
};
