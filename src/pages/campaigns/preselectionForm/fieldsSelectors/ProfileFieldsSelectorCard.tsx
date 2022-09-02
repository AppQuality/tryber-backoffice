import { useAppDispatch, useAppSelector } from "src/store";
import { Card, Checkbox, Text } from "@appquality/appquality-design-system";
import { toggleProfileField } from "src/pages/campaigns/preselectionForm/preselectionSlice";

export const ProfileFieldsSelectorCard = () => {
  const dispatch = useAppDispatch();
  const { profileFieldsList } = useAppSelector(
    (state) => state.campaignPreselection
  );
  return (
    <Card title={"User Profile Fields"} className="aq-mb-3" shadow>
      <Text small color="danger" className="aq-mb-3">
        Attenzione, le risposte dell'utente a queste domande modificano il suo
        profilo su tryber.me
      </Text>
      {profileFieldsList.map((f) => (
        <Checkbox
          key={f.fieldData.type}
          id={f.fieldData.type}
          label={f.fieldData.name}
          checked={f.checked}
          onChange={() => {
            dispatch(toggleProfileField(f.fieldData.id));
          }}
          className="aq-mb-2"
        />
      ))}
    </Card>
  );
};
