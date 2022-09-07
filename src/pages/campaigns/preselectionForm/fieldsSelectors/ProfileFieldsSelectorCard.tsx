import { Card, Checkbox, Text } from "@appquality/appquality-design-system";
import { FC, useState } from "react";
import { useFormikContext } from "formik";

const profileFieldsList: AdditionalField[] = [
  {
    fieldId: "gender",
    type: "gender",
    question: "Seleziona  il tuo genere",
  },
  {
    fieldId: "phone",
    type: "phone",
    question: "qual è il tuo numero di telefono?",
  },
  {
    fieldId: "address",
    type: "address",
    question: "Seleziona Città e Nazione di residenza",
  },
];

export const ProfileFieldsSelectorCard: FC<{
  add: (newField: AdditionalField) => void;
  remove: (index: number) => void;
}> = ({ add, remove }) => {
  const [selected, setselected] = useState<string[]>([]);
  const { values } = useFormikContext<PreselectionFormValues>();
  const toggleField = (id: string) => {
    if (selected.indexOf(id) >= 0) {
      //remove
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
      const newField = profileFieldsList.find((f) => f.fieldId === id);
      if (!newField) return;
      add(newField);
      setselected([...selected, id]);
    }
  };
  return (
    <Card title={"User Profile Fields"} className="aq-mb-3" shadow>
      <Text small color="danger" className="aq-mb-3">
        Attenzione, le risposte dell'utente a queste domande modificano il suo
        profilo su tryber.me
      </Text>
      {profileFieldsList.map((f) => (
        <Checkbox
          key={f.fieldId}
          id={f.fieldId}
          label={f.type}
          checked={selected.indexOf(f.fieldId) >= 0}
          onChange={() => {
            toggleField(f.fieldId);
          }}
          className="aq-mb-2"
        />
      ))}
    </Card>
  );
};
