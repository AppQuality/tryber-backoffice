import { ProfileFieldsSelectorCard } from "src/pages/campaigns/preselectionForm/fieldsSelectors/ProfileFieldsSelectorCard";
import { CufSelectorCard } from "src/pages/campaigns/preselectionForm/fieldsSelectors/CufSelectorCard";
import { CustomQuestionCard } from "src/pages/campaigns/preselectionForm/fieldsSelectors/CustomQuestionCard";
import { FieldArray } from "formik";

export const FieldsSelectors = () => {
  return (
    <FieldArray
      name="fields"
      render={(arrayHelpers) => (
        <>
          <ProfileFieldsSelectorCard
            add={arrayHelpers.push}
            remove={arrayHelpers.remove}
          />
          <CufSelectorCard
            add={arrayHelpers.push}
            remove={arrayHelpers.remove}
          />
          <CustomQuestionCard add={arrayHelpers.push} />
        </>
      )}
    />
  );
};
