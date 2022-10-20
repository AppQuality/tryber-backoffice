import { Card, Checkbox, Text } from "@appquality/appquality-design-system";
import { FC, useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { useAppSelector } from "src/store";

const profileFieldsList: AdditionalField[] = [
  {
    fieldId: "gender",
    type: "gender",
    name: "Gender",
    question: "Seleziona il tuo genere",
    shortTitle: "",
  },
  {
    fieldId: "phone_number",
    type: "phone_number",
    name: "Phone number",
    question: "Qual è il tuo numero di telefono? (in formato +393456789101)",
    shortTitle: "",
  },
  {
    fieldId: "address",
    type: "address",
    name: "Address",
    question: "Seleziona Nazione di residenza e Città",
    shortTitle: "",
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
        if (field.fieldId === id) {
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

  useEffect(() => {
    if (selected.length) {
      const newSelected = [...selected];
      selected.forEach((s, index) => {
        if (!values.fields.some((f) => f.fieldId === s)) {
          newSelected.splice(index, 1);
        }
      });
      setselected(newSelected);
    }
  }, [values.fields.length]);

  return (
    <Card title={"User Profile Fields"} className="aq-mb-3" shadow>
      <Text small color="danger" className="aq-mb-3">
        Watch out! Users' answers to these questions are going to update their
        profile on tryber.me
      </Text>
      {profileFieldsList.map((f) => {
        const isChecked = selected.indexOf(f.fieldId) >= 0;
        return (
          <Checkbox
            key={`${f.fieldId}-${isChecked}`}
            id={f.fieldId}
            label={f.name}
            defaultChecked={isChecked}
            disabled={isChecked}
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
