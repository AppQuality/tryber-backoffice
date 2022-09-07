import { FC } from "react";
import { QuestionField } from "src/pages/campaigns/preselectionForm/formConfigurator/QuestionField";
import { OptionsField } from "src/pages/campaigns/preselectionForm/formConfigurator/OptionsField";
import { CufMultiselect } from "src/pages/Jotform/CufConfigurator/CufMultiselect";
import { Card } from "@appquality/appquality-design-system";
import { useDrag } from "react-dnd";

export const ValuesFielsCard: FC<{
  field: AdditionalField | CustomUserField;
  index: number;
}> = ({ field, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "field",
    item: { field },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        alert(`You dropped ${field.fieldId} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  return (
    <div ref={drag}>
      <Card className="aq-mb-3" key={field.fieldId} title={field.type}>
        <QuestionField name={`fields.${index}.question`} />
        {"options" in field && field.options && <OptionsField index={index} />}
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
  );
};
