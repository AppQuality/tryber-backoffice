import { ProfileFieldsSelectorCard } from "src/pages/preselectionForms/components/fieldsSelectors/ProfileFieldsSelectorCard";
import { CufSelectorCard } from "src/pages/preselectionForms/components/fieldsSelectors/CufSelectorCard";
import { CustomQuestionCard } from "src/pages/preselectionForms/components/fieldsSelectors/CustomQuestionCard";
import { FieldArray } from "formik";

export const FieldsSelectors = () => {
  return (
    <FieldArray
      name="fields"
      render={(arrayHelpers) => (
        <>
          <CustomQuestionCard add={arrayHelpers.push} />
          <ProfileFieldsSelectorCard
            add={arrayHelpers.push}
            remove={arrayHelpers.remove}
          />
          <CufSelectorCard
            add={arrayHelpers.push}
            remove={arrayHelpers.remove}
          />
        </>
      )}
    />
  );
};
