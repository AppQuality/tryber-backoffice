import { ProfileFieldsSelectorCard } from "src/pages/campaigns/preselectionForm/fieldsSelectors/ProfileFieldsSelectorCard";
import { CufSelectorCard } from "src/pages/campaigns/preselectionForm/fieldsSelectors/CufSelectorCard";
import { CustomQuestionCard } from "src/pages/campaigns/preselectionForm/fieldsSelectors/CustomQuestionCard";

export const FieldsSelectors = () => {
  return (
    <div>
      <ProfileFieldsSelectorCard />
      <CufSelectorCard />
      <CustomQuestionCard />
    </div>
  );
};
