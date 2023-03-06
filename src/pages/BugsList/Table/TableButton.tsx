import React from "react";
import styled from "styled-components";
import { Button } from "@appquality/appquality-design-system";

const StyledButton = styled(Button)`
  border: none;
  padding: 0;
  :hover {
    border: none;
    text-decoration: underline;
    background-color: transparent;
    color: ${(props) => props.theme.palette.primary};
  }
`;

const TableButton = ({
  children,
  style,
  onClick,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => {
  return (
    <StyledButton
      onClick={onClick}
      style={style}
      size="sm"
      type="primary"
      flat={true}
    >
      {children}
    </StyledButton>
  );
};

export default TableButton;
