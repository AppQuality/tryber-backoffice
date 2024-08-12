import { icons } from "@appquality/appquality-design-system";
import styled, { css } from "styled-components";
import { ReactComponent as SmallGroupComponent } from "./assets/tryber.svg";

const iconstyle = css`
  font-size: 16px;
  width: 16px;
`;

const SmallGroup = styled(SmallGroupComponent)`
  ${iconstyle}
  color: ${({ theme }) => theme.palette.secondary}};
`;
const AdminOnly = styled(icons.ShieldLockFill)`
  ${iconstyle}
  color: ${({ theme }) => theme.colors.disabledFont}};
`;

const LoggedUsers = styled(icons.PeopleFill)`
  ${iconstyle}
  color: ${({ theme }) => theme.palette.primary}};
`;

const Public = styled(icons.GlobeAmericas)`
  ${iconstyle}
  color: ${({ theme }) => theme.variants.primary}};
`;

const Target = styled(icons.PersonVideo2)`
  ${iconstyle}
  color: ${({ theme }) => theme.variants.primary}};
`;

type Visibility = "public" | "smallgroup" | "logged" | "admin" | "target";

const VisibilityIcon = ({ visibility }: { visibility: Visibility }) => {
  if (visibility === "public") return <Public />;
  if (visibility === "smallgroup") return <SmallGroup />;
  if (visibility === "logged") return <LoggedUsers />;
  if (visibility === "admin") return <AdminOnly />;
  if (visibility === "target") return <Target />;
  return null;
};

VisibilityIcon.text = (visibility: Visibility) => {
  if (visibility === "public") return "Public";
  if (visibility === "smallgroup") return "Small Group";
  if (visibility === "logged") return "Logged Users";
  if (visibility === "admin") return "Admin Only";
  if (visibility === "target") return "Target";
  return "";
};

export default VisibilityIcon;
