import { Field, Button } from "@appquality/appquality-design-system";
import { FieldArray, useFormikContext } from "formik";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ValuesFieldsCard } from "src/pages/campaigns/preselectionForm/formConfigurator/ValuesFieldsCard";
import { CampaignSelect } from "./CampaignSelect";

export const FormConfigurator = () => {
  const { values } = useFormikContext<PreselectionFormValues>();
  return (
    <DndProvider backend={HTML5Backend}>
      <Field
        name="formTitle"
        type="text"
        placeholder="e.g. CP-3887 Preselection Form"
        label={"Form Title"}
      />
      <CampaignSelect name="campaign" label="Linked Campaign" />
      <FieldArray
        name="fields"
        render={(arrayHelpers) => (
          <>
            {values.fields.map((field, index) => (
              <ValuesFieldsCard
                field={field}
                index={index}
                move={arrayHelpers.move}
                remove={arrayHelpers.remove}
                key={field.fieldId}
              />
            ))}
          </>
        )}
      />
      <Button htmlType="submit" type="primary">
        Save
      </Button>{" "}
    </DndProvider>
  );
};
