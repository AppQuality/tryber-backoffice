import { Pill } from "@appquality/appquality-design-system";
import { useMemo } from "react";
import { FormValuesInterface } from "../UxForm/FormProvider";

interface SeverityPillProps {
  severity: FormValuesInterface["insights"][number]["severity"];
}
const SeverityPill = ({ severity }: SeverityPillProps) => {
  const type = useMemo(() => {
    switch (severity.name) {
      case "Critical":
        return "danger";
      case "Minor":
        return "warning";
      case "Observation":
        return "info";
      case "Positive":
        return "success";
      default:
        return "primary";
    }
  }, [severity.name]);
  return (
    <Pill className="aq-mr-1" type={type} flat>
      {severity.name}
    </Pill>
  );
};

export default SeverityPill;
