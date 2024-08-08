import { icons } from "@appquality/appquality-design-system";
import styled from "styled-components";

export const Ban = styled(icons.SlashCircle)`
  margin-top: ${({ theme }) => theme.grid.sizes[1]};
  color: ${({ theme }) => theme.palette.danger};
`;

export const CheckCircle = styled(icons.CheckCircle)`
  margin-top: ${({ theme }) => theme.grid.sizes[1]};
  color: ${({ theme }) => theme.palette.success};
`;
