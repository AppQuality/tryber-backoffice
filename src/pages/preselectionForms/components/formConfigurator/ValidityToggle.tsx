import { Button } from "@appquality/appquality-design-system";
import { Ban, CheckCircle } from "src/components/icons";
import styled from "styled-components";

const IconButtonComponent = styled(Button)`
  svg {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const InvalidButtonComponent = ({
  className,
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) => (
  <IconButtonComponent
    title="Disqualifying. Click to make it accepted"
    className={className}
    kind="danger"
    onClick={onClick}
  >
    <Ban size="16" />
  </IconButtonComponent>
);
const InvalidButton = styled(InvalidButtonComponent)`
  &:hover {
    background-color: ${({ theme }) => theme.palette.success};
    border-color: ${({ theme }) => theme.palette.success};
  }
`;

const ValidButtonComponent = ({
  className,
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) => (
  <IconButtonComponent
    title="Accepted. Click it to make it disqualyifing"
    className={className}
    kind="success"
    onClick={onClick}
  >
    <CheckCircle size="16" />
  </IconButtonComponent>
);
const ValidButton = styled(ValidButtonComponent)`
  &:hover {
    background-color: ${({ theme }) => theme.palette.danger};
    border-color: ${({ theme }) => theme.palette.danger};
  }
`;

export const ValidityToggle = ({
  isInvalid,
  onClick,
}: {
  isInvalid: boolean;
  onClick: () => void;
}) => {
  if (isInvalid) {
    return <InvalidButton onClick={onClick} />;
  }

  return <ValidButton onClick={onClick} />;
};
