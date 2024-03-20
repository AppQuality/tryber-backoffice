import { Pill, icons } from "@appquality/appquality-design-system";
import styled from "styled-components";

const { X } = icons;

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
        <X size={16} />
      </span>
    </Pill>
  );
};

const FilterPill = styled(FilterPillComponent)`
  display: inline-flex;
  align-items: center;
  span {
    border-radius: 50%;
    margin-left: ${(props) => props.theme.grid.sizes[2]};
    display: inline-flex;
    cursor: pointer;
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.variants.secondary};
    &:hover {
      color: ${(props) => props.theme.palette.secondary};
    }

    svg {
      stroke-width: 1;
    }
  }
`;

export { FilterPill };
