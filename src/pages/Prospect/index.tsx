import { Button, Title } from "@appquality/appquality-design-system";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useContainerDimensions } from "src/hooks/useContainerDimensions";
import { useGetCampaignsByCampaignQuery } from "src/services/tryberApi";
import styled from "styled-components";
import Table from "./Table";

const FluidContainer = styled.div`
  max-width: 90%;
  margin: 0 auto;
`;

const HeaderButton = (props: Parameters<typeof Button>[0]) => {
  return <Button {...props} size="sm" type="link-hover" />;
};

const Prospect = () => {
  const { id } = useParams<{ id: string }>();
  const tablewrapper = useRef<HTMLDivElement>(null);
  const { width } = useContainerDimensions(tablewrapper);
  const { data } = useGetCampaignsByCampaignQuery({
    campaign: id,
  });
  return (
    <FluidContainer ref={tablewrapper}>
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
        Pay Assistants
      </HeaderButton>
      <HeaderButton
        as="a"
        href={`/wp-admin/admin.php?page=add-booty&cid=${id}`}
        className="aq-mr-2"
      >
        Go to Add Booty
      </HeaderButton>
      <Title size="mt" className="aq-mb-3" style={{ display: "flex" }}>
        CP{id} {data?.title ? `- ${data.title}` : ""}
      </Title>
      <Table id={id} containerWidth={width} />
    </FluidContainer>
  );
};

export default Prospect;
