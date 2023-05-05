import styled from "styled-components";
import { ReactComponent as BugComponent } from "./assets/bugfinding.svg";
import { ReactComponent as UXComponent } from "./assets/userexperience.svg";

const Bug = styled(BugComponent)`
  width: 16px;
  font-size: 16px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.variants.info}};
`;

const UX = styled(UXComponent)`
  width: 16px;
  font-size: 16px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.variants.success}};
`;

const BugTypeIcon = ({ area }: { area: "quality" | "experience" }) => {
  if (area === "quality") return <Bug />;
  if (area === "experience") return <UX />;
  return null;
};

const BugType = ({
  area,
  name,
}: {
  area: "quality" | "experience";
  name: string;
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <BugTypeIcon area={area} /> <span>{name}</span>
    </div>
  );
};
export default BugType;
