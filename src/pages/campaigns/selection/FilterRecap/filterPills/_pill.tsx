import { Pill } from "@appquality/appquality-design-system";
import { X } from "react-bootstrap-icons";
import styled from "styled-components";

const FilterPillComponent = ({
  className,
  label,
  children,
  onRemove,
}: {
  className?: string;
  label: string;
  children: React.ReactNode;
  onRemove: () => void;
}) => {
  return (
    <Pill className={className} flat type="secondary">
      {label}: {children}
      <span onClick={onRemove}>
        <X />
      </span>
    </Pill>
  );
};

const FilterPill = styled(FilterPillComponent)`
  display: inline-flex;
  align-items: center;
  span {
    border-radius: 50%;
    padding: 4px;
    margin-left: 4px;
    display: inline-flex;
    cursor: pointer;
    &:hover {
      background: ${(props) => props.theme.colors.gray200};
    }
  }
`;

export { FilterPill };
