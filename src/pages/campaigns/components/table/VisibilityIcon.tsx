import { icons } from "@appquality/appquality-design-system";
import styled from "styled-components";
import { ReactComponent as SmallGroupComponent } from "./assets/tryber.svg";

const SmallGroup = styled(SmallGroupComponent)`
  font-size: 16px;
  width: 16px;
  color: ${({ theme }) => theme.palette.secondary}};
`;
const AdminOnly = styled(icons.ShieldLockFill)`
  font-size: 16px;
  width: 16px;
  color: ${({ theme }) => theme.colors.disabledFont}};
`;

const LoggedUsers = styled(icons.PeopleFill)`
  font-size: 16px;
  width: 16px;
  color: ${({ theme }) => theme.palette.primary}};
`;

const Public = styled(icons.GlobeAmericas)`
  font-size: 16px;
  width: 16px;
  color: ${({ theme }) => theme.variants.primary}};
`;

type Visibility = "public" | "smallgroup" | "logged" | "admin";

const VisibilityIcon = ({ visibility }: { visibility: Visibility }) => {
  if (visibility === "public") return <Public />;
  if (visibility === "smallgroup") return <SmallGroup />;
  if (visibility === "logged") return <LoggedUsers />;
  if (visibility === "admin") return <AdminOnly />;
  return null;
};

VisibilityIcon.text = (visibility: Visibility) => {
  if (visibility === "public") return "Public";
  if (visibility === "smallgroup") return "Small Group";
  if (visibility === "logged") return "Logged Users";
  if (visibility === "admin") return "Admin Only";
  return "";
};

export default VisibilityIcon;
