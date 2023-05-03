import { icons } from "@appquality/appquality-design-system";
import styled from "styled-components";
import { ReactComponent as SmallGroupComponent } from "./assets/tryber.svg";

const SmallGroup = styled(SmallGroupComponent)`
  width: 16px;
  color: ${({ theme }) => theme.palette.secondary}};
`;
const AdminOnly = styled(icons.ShieldLockFill)`
  width: 16px;
  color: ${({ theme }) => theme.colors.disabledFont}};
`;

const VisibilityIcon = ({
  visibility,
}: {
  visibility: "public" | "smallgroup" | "logged" | "admin";
}) => {
  if (visibility === "public") return <>P</>;
  if (visibility === "smallgroup") return <SmallGroup />;
  if (visibility === "logged") return <>L</>;
  if (visibility === "admin") return <AdminOnly />;
  return null;
};

export default VisibilityIcon;
