import styled from "styled-components";
import { GripVertical } from "react-bootstrap-icons";

const Styled = styled.div`
  cursor: grab !important;
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray500};
  transition: all 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const Handler = ({ handleDragProps }: { handleDragProps?: any }) => {
  return (
    <Styled {...handleDragProps} role="handler">
      <GripVertical size={18} />
    </Styled>
  );
};

export default Handler;
