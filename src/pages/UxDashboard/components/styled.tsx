import styled from "styled-components";

export const InsightsWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${({ theme }) => theme.grid.sizes[2]};
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.gray100};
  padding: ${({ theme }) => theme.grid.sizes[2]};
`;
