import { FC, useEffect } from "react";
import { OptionsField } from "src/pages/preselectionForms/components/formConfigurator/OptionsField";
import {
  aqBootstrapTheme,
  Card,
  Text,
  TextareaField,
} from "@appquality/appquality-design-system";
import { useDrag } from "react-dnd";
import { DropZone } from "src/pages/preselectionForms/components/formConfigurator/DropZone";
import { XLg, GripVertical } from "react-bootstrap-icons";
import { ShortTitleField } from "./ShortTitleField";
import styled from "styled-components";
import { CufMultiselect } from "./CufMultiselect";

const StyledInlineField = styled.div`
  display: flex;
  .leftField {
    width: 70%;
    margin-right: 8px;
  }
  .rightField {
    width: 30%;
    margin-left: 8px;
  }
`;

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

  // set textarea height in edit mode
  useEffect(() => {
    const element = document.getElementById(`fields.${index}.question`);
    if (element) {
      element.style.height = "1px";
      element.style.height = element.scrollHeight + "px";
    }
  }, []);

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
          {"fieldId" in field && field.fieldId === "address" && (
            <Text small color="danger" className="aq-mb-2">
              The tester must have Google services active in order to fill in
              the address field
            </Text>
          )}
          <StyledInlineField>
            <TextareaField
              label={"Question"}
              name={`fields.${index}.question`}
              className="leftField"
              height="2.643rem"
              autoResize
            />
            <ShortTitleField
              name={`fields.${index}.shortTitle`}
              className="rightField"
            />
          </StyledInlineField>
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
