import { ProfileFieldsSelectorCard } from "src/pages/campaigns/preselectionForm/fieldsSelectors/ProfileFieldsSelectorCard";
import { CufSelectorCard } from "src/pages/campaigns/preselectionForm/fieldsSelectors/CufSelectorCard";
import { Button } from "@appquality/appquality-design-system";

export const FieldsSelectors = () => {
  return (
    <>
      <Button>New (+)</Button>
      <ProfileFieldsSelectorCard />
      <CufSelectorCard />
    </>
  );
};
