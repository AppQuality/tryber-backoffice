import { Steps } from "@appquality/appquality-design-system";
import styled from "styled-components";

export const InsightsWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(
    3,
    calc(33.33% - 6px)
  ); // account for 6px cards border widths
  gap: ${({ theme }) => theme.grid.sizes[2]};
  justify-content: flex-start;
  > div > div {
    height: 100%;
  }
  .aq-card-body {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
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

export const InsightPillsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.grid.sizes[1]};
  margin-bottom: ${({ theme }) => theme.grid.sizes[2]};
`;

export const ObservationsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  gap: 1rem;
  margin-bottom: 1rem;
  .play-pause-button {
    display: block;
  }
  .progress-bar {
  }
`;
