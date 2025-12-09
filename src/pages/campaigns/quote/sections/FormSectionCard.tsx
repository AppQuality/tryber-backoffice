import React from "react";
import { Card, Steps } from "@appquality/appquality-design-system";

export const FormSectionCard = () => {
  return (
    <Card className="aq-mb-4" title="Form Section">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Steps className="aq-m-3" current={0} direction="vertical">
          <Steps.Step
            description=""
            isCompleted
            title="History activity quotation"
          />
          <Steps.Step description="" title="Revenue details" />
          <Steps.Step description="" title="Cost & Resource details" />
        </Steps>
      </div>
    </Card>
  );
};
