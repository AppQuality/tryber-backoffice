import { Card } from "@appquality/appquality-design-system";
import { CufTextField } from "./CufTextField";

export const FormTitleCard = () => {
  return (
    <Card title={"Form"} className="aq-mb-3">
      <CufTextField name={"formTitle"} label="Title" />
    </Card>
  );
};
