import React from "react";
import styled from "styled-components";
import { Button } from "@appquality/appquality-design-system";

const StyledButton = styled(({ children, style, href, ...rest }) => (
  <Button as="a" style={style} href={href} {...rest}>
    {children}
  </Button>
))`
  border: none;
  padding: 0;
  background-color: transparent;
  :hover {
    border: none;
    text-decoration: underline;
    background-color: transparent;
    color: ${(props) => props.theme.palette.secondary};
  }
`;

const TableButton = ({
  children,
  style,
  href,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  href: string;
}) => {
  return (
    <StyledButton
      href={href}
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
