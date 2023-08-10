import { Steps } from "@appquality/appquality-design-system";
import styled from "styled-components";

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

export const InsightPillsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.grid.sizes[1]};
  margin-bottom: ${({ theme }) => theme.grid.sizes[2]};
`;
