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

const VisibilityIcon = ({
  visibility,
}: {
  visibility: "public" | "smallgroup" | "logged" | "admin";
}) => {
  if (visibility === "public") return <Public />;
  if (visibility === "smallgroup") return <SmallGroup />;
  if (visibility === "logged") return <LoggedUsers />;
  if (visibility === "admin") return <AdminOnly />;
  return null;
};

export default VisibilityIcon;
