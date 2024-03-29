import { Pill } from "@appquality/appquality-design-system";
import { useMemo } from "react";
import { FormInsight } from "../FormProvider";

interface SeverityPillProps {
  severity: FormInsight["severity"];
}
const SeverityPill = ({ severity }: SeverityPillProps) => {
  const type = useMemo(() => {
    switch (severity.name) {
      case "Major":
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
    <Pill
      className="aq-mr-1"
      type={type}
      flat
      data-qa={`severity-pill-${severity.name}`}
    >
      {severity.name}
    </Pill>
  );
};

export default SeverityPill;
