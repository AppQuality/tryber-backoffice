import styled from "styled-components";

const ActionBar = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: ${({ theme }) => theme.grid.sizes[3]};
`;

export default ActionBar;
