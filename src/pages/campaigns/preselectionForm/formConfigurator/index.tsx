import { Field, Button } from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ValuesFielsCard } from "src/pages/campaigns/preselectionForm/formConfigurator/ValuesFielsCard";

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
      <div>
        {values.fields.map((field, index) => (
          <ValuesFielsCard field={field} index={index} key={field.fieldId} />
        ))}
      </div>
      <Button htmlType="submit" type="primary">
        Save
      </Button>{" "}
      <Button htmlType="reset" type="warning" flat>
        Reset
      </Button>{" "}
      <Button type="info" flat>
        Preview
      </Button>
    </DndProvider>
  );
};
