import styled from "styled-components";

const ActionBar = styled.div`
  display: flex;
  justify-content: start;
  gap: ${({ theme }) => theme.grid.sizes[2]};
  margin: ${({ theme }) => theme.grid.sizes[3]} 0;
  padding: ${({ theme }) => theme.grid.sizes[2]}
    ${({ theme }) => theme.grid.sizes[3]};
  background-color: ${({ theme }) => theme.colors.gray300};
`;

export default ActionBar;
