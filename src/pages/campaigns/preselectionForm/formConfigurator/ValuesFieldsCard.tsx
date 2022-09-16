import { FC } from "react";
import { QuestionField } from "src/pages/campaigns/preselectionForm/formConfigurator/QuestionField";
import { OptionsField } from "src/pages/campaigns/preselectionForm/formConfigurator/OptionsField";
import { CufMultiselect } from "src/pages/Jotform/CufConfigurator/CufMultiselect";
import { aqBootstrapTheme, Card } from "@appquality/appquality-design-system";
import { useDrag } from "react-dnd";
import { DropZone } from "src/pages/campaigns/preselectionForm/formConfigurator/DropZone";
import { XLg, GripVertical } from "react-bootstrap-icons";
import { ShortTitleField } from "./ShortTitleField";

export const ValuesFieldsCard: FC<{
  field: AdditionalField | CustomUserField;
  index: number;
  move: (from: number, to: number) => void;
  remove: (index: number) => void;
}> = ({ field, index, move, remove }) => {
  const [{ currentlyDragging }, drag, preview] = useDrag(() => {
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
      <div ref={preview} style={{ opacity: currentlyDragging ? 0.5 : 1 }}>
        <Card
          key={field.fieldId}
          title={
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gridColumnGap: aqBootstrapTheme.grid.sizes[1],
                alignItems: "center",
              }}
            >
              <div ref={drag} style={{ display: "flex", alignItems: "center" }}>
                <GripVertical
                  style={{ marginRight: aqBootstrapTheme.grid.sizes[1] }}
                />
                {field.name}
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to remove this field?"
                    )
                  ) {
                    remove(index);
                  }
                }}
              >
                <XLg color="black" />
              </div>
            </div>
          }
        >
          <QuestionField name={`fields.${index}.question`} />
          <ShortTitleField name={`fields.${index}.shortTitle`} />
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
