import { Field, Button, Card } from "@appquality/appquality-design-system";
import { useFormikContext } from "formik";
import { QuestionField } from "src/pages/campaigns/preselectionForm/formConfigurator/QuestionField";
import { OptionsField } from "src/pages/campaigns/preselectionForm/formConfigurator/OptionsField";
import { CufMultiselect } from "src/pages/Jotform/CufConfigurator/CufMultiselect";

export const FormConfigurator = () => {
  const { values } = useFormikContext<PreselectionFormValues>();
  return (
    <div>
      <Field
        name="formTitle"
        type="text"
        placeholder="e.g. CP-3887 Preselection Form"
        label={"Form Title"}
      />
      <div>
        {values.fields.map((field, index) => (
          <Card className="aq-mb-3" key={field.fieldId} title={field.type}>
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
    </div>
  );
};
