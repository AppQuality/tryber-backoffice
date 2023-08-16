import { Card } from "@appquality/appquality-design-system";
import { ReactNode } from "react";
import styled from "styled-components";

const StyledCard = styled(Card)`
  @media (min-width: 768px) {
    .aq-card-body {
      display: grid;
      grid-template-columns: 350px 1fr 50px;
      grid-gap: ${({ theme }) => theme.grid.sizes[3]};
      margin: 0;
      > div:first-child {
        background-color: ${({ theme }) => theme.colors.gray900};
        display: flex;
        align-items: center;
        justify-content: center;
      }
      > div:nth-child(2) {
        padding-top: ${({ theme }) => theme.grid.sizes[3]};
        padding-bottom: ${({ theme }) => theme.grid.sizes[3]};
      }
    }
  }
`;

export const ListItemCard = ({ children }: { children: ReactNode }) => (
  <StyledCard bodyClass="list-item-card">{children}</StyledCard>
);
