import React, { useState } from "react";
import { Button, Card, Radio } from "@appquality/appquality-design-system";
import { v4 as uuidv4 } from "uuid";

export const CustomQuestionCard: React.FC<{
  add: (field: AdditionalField) => void;
}> = ({ add }) => {
  const [selected, setSelected] = useState<CustomQuestionType>();
  const newCustomQuestion = () => {
    if (selected)
      add({
        type: selected,
        fieldId: uuidv4(),
        question: "",
        ...(selected !== "text" ? { options: [] } : undefined),
      });
  };

  const QuestionTypeRadio: React.FC<{ type: CustomQuestionType }> = ({
    type,
  }) => {
    return (
      <Radio
        onChange={(val) => setSelected(val as CustomQuestionType)}
        label={type}
        name="customQuestion"
        id={`customQuestion-${type}`}
        value={type}
        checked={type === selected}
      />
    );
  };

  return (
    <Card title={"Add a Custom Question"}>
      <div className="aq-mb-3">
        <QuestionTypeRadio type="text" />
        <QuestionTypeRadio type="radio" />
        <QuestionTypeRadio type="select" />
        <QuestionTypeRadio type="multiselect" />
      </div>
      <Button disabled={!selected} size="block" onClick={newCustomQuestion}>
        Add a Custom Question
      </Button>
    </Card>
  );
};
