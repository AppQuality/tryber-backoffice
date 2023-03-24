import { useParams } from "react-router-dom";
import Table from "./Table";
import { Button, Title } from "@appquality/appquality-design-system";
import styled from "styled-components";

const FluidContainer = styled.div`
  max-width: 90%;
  margin: 0 auto;
`;

const HeaderButton = (props: Parameters<typeof Button>[0]) => {
  return <Button {...props} size="sm" type="link-hover" />;
};

const Prospect = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <FluidContainer>
      <Title size="xl">Prospect</Title>
      <HeaderButton
        as="a"
        href={`/wp-admin/admin.php?page=cp-prospect&id=${id}`}
        type="secondary"
        className="aq-mr-2"
      >
        {"<"} Go to old Prospect
      </HeaderButton>
      <HeaderButton
        as="a"
        href={`/wp-admin/admin.php?page=cp-prospect-crowd&id=${id}`}
        className="aq-mr-2"
      >
        Go to Assistant
      </HeaderButton>
      <HeaderButton
        as="a"
        href={`/wp-admin/admin.php?page=add-booty&cid=${id}`}
        className="aq-mr-2"
      >
        Go to Add Booty
      </HeaderButton>
      <Title size="mt" className="aq-mb-3">
        Campaign {id}
      </Title>
      <Table id={id} />
    </FluidContainer>
  );
};

export default Prospect;
