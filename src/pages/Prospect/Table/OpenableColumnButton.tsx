import { icons } from "@appquality/appquality-design-system";
import styled from "styled-components";

const { ChevronCompactRight } = icons;

const OpenableColumnButtonComponent = ({
  className,
  onClick,
  children,
  isOpen = false,
}: {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  isOpen?: boolean;
}) => (
  <div className={`aq-p-1 ${className}`} onClick={onClick}>
    {children} <ChevronCompactRight className="icon" />
  </div>
);
const OpenableColumnButton = styled(OpenableColumnButtonComponent)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.palette.secondary};
  }
  ${({ isOpen }) =>
    isOpen &&
    `
  svg.icon {
    transform: scale(-1, 1);
  }
  `}
`;

export default OpenableColumnButton;
