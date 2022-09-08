import { FC } from "react";
import { QuestionField } from "src/pages/campaigns/preselectionForm/formConfigurator/QuestionField";
import { OptionsField } from "src/pages/campaigns/preselectionForm/formConfigurator/OptionsField";
import { CufMultiselect } from "src/pages/Jotform/CufConfigurator/CufMultiselect";
import { Card } from "@appquality/appquality-design-system";
import { useDrag } from "react-dnd";
import { DropZone } from "src/pages/campaigns/preselectionForm/formConfigurator/DropZone";

export const ValuesFieldsCard: FC<{
  field: AdditionalField | CustomUserField;
  index: number;
  move: (from: number, to: number) => void;
}> = ({ field, index, move }) => {
  const [{ currentlyDragging }, drag] = useDrag(() => {
    return {
      type: "field",
      item: { field: { ...field }, index: index },
      end: (item: DragItem, monitor) => {
        const dropResult = monitor.getDropResult<{ dropIndex: number }>();
        if (item && dropResult) {
          move(item.index, dropResult.dropIndex);
        }
      },
      collect: (monitor) => ({
        currentlyDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    };
  }, [index, field]);
  return (
    <>
      {index === 0 && !currentlyDragging && <DropZone dropIndex={0} />}
      <div style={{ opacity: currentlyDragging ? 0.5 : 1 }} ref={drag}>
        <Card key={field.fieldId} title={`${field.type} ${index}`}>
          <QuestionField name={`fields.${index}.question`} />
          {"options" in field && field.options && (
            <OptionsField index={index} />
          )}
          {"availableOptions" in field && field.availableOptions && (
            <CufMultiselect
              name={`fields.${index}.selectedOptions`}
              label={"Options"}
              options={field.availableOptions?.map((o) => {
                return { value: o.id.toString(), label: o.name };
              })}
            />
          )}
        </Card>
      </div>
      {!currentlyDragging && <DropZone dropIndex={index + 1} />}
    </>
  );
};
