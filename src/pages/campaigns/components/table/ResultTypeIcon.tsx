import { icons } from "@appquality/appquality-design-system";
import styled from "styled-components";

const BugParade = styled(icons.TrophyFill)`
font-size: 16px;
float: left;
color: ${({ theme }) => theme.palette.info}};
`;

const Bug = styled(icons.BugFill)`
font-size: 16px;
float: left;
  color: ${({ theme }) => theme.variants.info}};
  `;
const Deny = styled(icons.XCircleFill)`
font-size: 16px;
float: left;
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
