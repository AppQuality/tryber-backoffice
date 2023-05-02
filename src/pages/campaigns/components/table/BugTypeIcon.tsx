import { icons } from "@appquality/appquality-design-system";

const Bug = icons.BugFill;
const UX = icons.BinocularsFill;

const BugTypeIcon = ({ area }: { area: "quality" | "experience" }) => {
  if (area === "quality") return <Bug />;
  if (area === "experience") return <UX />;
  return null;
};

export default BugTypeIcon;
