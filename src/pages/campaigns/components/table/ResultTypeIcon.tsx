import { icons } from "@appquality/appquality-design-system";
import styled from "styled-components";

const BugParade = styled(icons.TrophyFill)`
color: ${({ theme }) => theme.palette.info}};
`;

const Bug = styled(icons.BugFill)`
  color: ${({ theme }) => theme.variants.info}};
  `;
const Deny = styled(icons.XCircleFill)`
color: ${({ theme }) => theme.colors.disabledFont}};
`;

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
