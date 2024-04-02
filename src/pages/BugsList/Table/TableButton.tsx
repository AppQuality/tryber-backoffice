import { Button } from "@appquality/appquality-design-system";
import { ButtonProps } from "@appquality/appquality-design-system/dist/stories/button/_types";
import React from "react";
import styled from "styled-components";

const StyledButton = styled(
  ({ children, style, href, ...rest }: ButtonProps) => (
    <Button as="a" style={style} href={href} {...rest}>
      {children}
    </Button>
  )
)`
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
      kind="primary"
      flat={true}
    >
      {children}
    </StyledButton>
  );
};

export default TableButton;
