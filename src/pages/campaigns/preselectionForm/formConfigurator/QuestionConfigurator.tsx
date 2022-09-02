import { Button, Card } from "@appquality/appquality-design-system";
import React from "react";
import { XLg } from "react-bootstrap-icons";
import { useAppDispatch } from "src/store";
import { removeCustomQuestion } from "src/pages/campaigns/preselectionForm/preselectionSlice";

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
          custom question{" "}
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
      {field.fieldData.type === "text" && <div>text</div>}
      {field.fieldData.type === "select" && <div>select</div>}
      {field.fieldData.type === "multiselect" && <div>multiselect</div>}
      {field.fieldData.type === "radio" && <div>radio</div>}
    </Card>
  );
};
