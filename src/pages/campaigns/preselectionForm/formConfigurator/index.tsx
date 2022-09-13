import { Field, Button } from "@appquality/appquality-design-system";
import { FieldArray, useFormikContext } from "formik";
import { DndProvider, useDragLayer } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ValuesFieldsCard } from "src/pages/campaigns/preselectionForm/formConfigurator/ValuesFieldsCard";
import { CampaignSelect } from "./CampaignSelect";

export const FormConfigurator = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Field
        name="formTitle"
        type="text"
        placeholder="e.g. CP-3887 Preselection Form"
        label={"Form Title"}
      />
      <CampaignSelect name="campaign" label="Linked Campaign" />
      <FieldsContainer />
      <Button htmlType="submit" type="primary">
        Save
      </Button>{" "}
    </DndProvider>
  );
};

const FieldsContainer = () => {
  const { values } = useFormikContext<PreselectionFormValues>();
  useScroll({
    threshold: 200,
    step: 10,
  });
  return (
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
  );
};

const useScroll = ({
  threshold,
  step,
}: {
  threshold: number;
  step: number;
}) => {
  const draggedItem = useDragLayer((monitor) => ({
    offset: monitor.getClientOffset(),
  }));
  if (draggedItem.offset) {
    if (draggedItem.offset.y < threshold) {
      window.scroll(0, window.scrollY - step);
    }
    if (draggedItem.offset.y > window.innerHeight - threshold) {
      window.scroll(0, window.scrollY + step);
    }
  }
};
