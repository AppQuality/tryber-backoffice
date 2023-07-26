import { Steps } from "@appquality/appquality-design-system";
import styled from "styled-components";

export const InsightsWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(
    3,
    calc(33.33% - 6px)
  ); // account for 6px cards border widths
  gap: ${({ theme }) => theme.grid.sizes[2]};
  justify-content: flex-start;
`;

export const AddNewInsightCTA = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon-big {
    font-size: 5rem;
    line-height: 1;
  }
  transition: color 0.2s ease-in-out;
  color: ${({ theme }) => theme.colors.gray400};
  &:hover {
    color: ${({ theme }) => theme.colors.gray800};
  }
`;

export const StyledSteps = styled(Steps)`
  .step-status-icon {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;
