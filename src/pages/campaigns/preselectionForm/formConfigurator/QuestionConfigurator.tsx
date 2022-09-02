import { Button, Card } from "@appquality/appquality-design-system";
import React from "react";
import { XLg } from "react-bootstrap-icons";
import { useAppDispatch } from "src/store";
import { removeCustomQuestion } from "src/pages/campaigns/preselectionForm/preselectionSlice";
import { QuestionField } from "src/pages/campaigns/preselectionForm/formConfigurator/QuestionField";
import { OptionsField } from "src/pages/campaigns/preselectionForm/formConfigurator/OptionsField";

export const QuestionConfigurator: React.FC<{
  field: CustomQuestion;
}> = ({ field }) => {
  const dispatch = useAppDispatch();
  const deleteQuestion = () => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      dispatch(removeCustomQuestion(field.fieldData.id));
    }
  };
  return (
    <Card
      title={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {`Custom ${field.fieldData.type} field`}
          <Button
            flat
            size="sm"
            style={{ padding: "0 4px" }}
            onClick={deleteQuestion}
          >
            <XLg />
          </Button>
        </div>
      }
      className="aq-mb-3"
    >
      {field.fieldData.type === "text" && (
        <QuestionField name={field.fieldData.id} />
      )}
      {field.fieldData.type === "select" && (
        <>
          <QuestionField name={field.fieldData.id} />
          <OptionsField name={field.fieldData.id} />
        </>
      )}
      {field.fieldData.type === "radio" && (
        <>
          <QuestionField name={field.fieldData.id} />
          <OptionsField name={field.fieldData.id} />
        </>
      )}
      {field.fieldData.type === "multiselect" && (
        <>
          <QuestionField name={field.fieldData.id} />
          <OptionsField name={field.fieldData.id} />
        </>
      )}
    </Card>
  );
};
