import { useAppDispatch } from "src/store";
import React, { useState } from "react";
import { Button, Card, Radio } from "@appquality/appquality-design-system";
import { addCustomQuestion } from "src/pages/campaigns/preselectionForm/preselectionSlice";

export const CustomQuestionCard = () => {
  const [selected, setSelected] = useState<CustomQuestionType>();
  const dispatch = useAppDispatch();
  const newCustomQuestion = () => {
    if (selected) dispatch(addCustomQuestion(selected));
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
