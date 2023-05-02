import { icons } from "@appquality/appquality-design-system";

const BugParade = icons.TrophyFill;
const Bug = icons.BugFill;
const Deny = icons.XCircleFill;

const ResultTypeIcon = ({
  resultType,
}: {
  resultType: "bug" | "bugparade" | "no";
}) => {
  if (resultType === "bug") return <Bug />;
  if (resultType === "bugparade") return <BugParade />;
  if (resultType === "no") return <Deny />;
  return null;
};

export default ResultTypeIcon;
