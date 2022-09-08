import { Card, Checkbox, Text } from "@appquality/appquality-design-system";
import { FC, useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { useAppSelector } from "src/store";

const profileFieldsList: AdditionalField[] = [
  {
    fieldId: "gender",
    type: "gender",
    name: "Genere",
    question: "Seleziona  il tuo genere",
  },
  {
    fieldId: "phone",
    type: "phone_number",
    name: "Telefono",
    question: "qual è il tuo numero di telefono?",
  },
  {
    fieldId: "address",
    type: "address",
    name: "Indirizzo",
    question: "Seleziona Città e Nazione di residenza",
  },
];

export const ProfileFieldsSelectorCard: FC<{
  add: (newField: AdditionalField) => void;
  remove: (index: number) => void;
}> = ({ add, remove }) => {
  const [selected, setselected] = useState<string[]>([]);
  const { values } = useFormikContext<PreselectionFormValues>();
  const { loadedForm } = useAppSelector((state) => state.campaignPreselection);

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

  useEffect(() => {
    if (loadedForm?.fields) {
      const s: string[] = [];
      loadedForm.fields.forEach((f) => {
        if (profileFieldsList.some((p) => p.fieldId === f.type)) {
          s.push(f.type);
        }
      });
      setselected(s);
    }
  }, [loadedForm]);

  return (
    <Card title={"User Profile Fields"} className="aq-mb-3" shadow>
      <Text small color="danger" className="aq-mb-3">
        Attenzione, le risposte dell'utente a queste domande modificano il suo
        profilo su tryber.me
      </Text>
      {profileFieldsList.map((f) => {
        const isChecked = selected.indexOf(f.fieldId) >= 0;
        return (
          <Checkbox
            key={`${f.fieldId}-${isChecked}`}
            id={f.fieldId}
            label={f.type}
            checked={isChecked}
            onChange={() => {
              toggleField(f.fieldId);
            }}
            className="aq-mb-2"
          />
        );
      })}
    </Card>
  );
};
