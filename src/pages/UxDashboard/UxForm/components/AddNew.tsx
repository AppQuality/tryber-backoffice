import { Card, Title } from "@appquality/appquality-design-system";
import { CardProps } from "@appquality/appquality-design-system/dist/stories/card/CardProps";
import { ComponentProps } from "react";
import { Plus } from "react-bootstrap-icons";
import styled from "styled-components";

const StyledCard = styled(Card)`
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  .aq-card-body {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const AddNew = ({
  children,
  ...props
}: CardProps & ComponentProps<"div">) => {
  return (
    <StyledCard shadow {...props}>
      <Plus size={24} />
      <Title variant size="s">
        {children}
      </Title>
    </StyledCard>
  );
};
