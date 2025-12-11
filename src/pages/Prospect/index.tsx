import { Button, Title } from "@appquality/appquality-design-system";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import { useContainerDimensions } from "src/hooks/useContainerDimensions";
import { useGetCampaignsByCampaignQuery } from "src/services/tryberApi";
import styled from "styled-components";
import Table from "./Table";

const FluidContainer = styled.div`
  max-width: 90%;
  margin: 0 auto;
`;

const Prospect = () => {
  const { id } = useParams<{ id: string }>();
  const tablewrapper = useRef<HTMLDivElement>(null);
  const { width } = useContainerDimensions(tablewrapper);
  const { data } = useGetCampaignsByCampaignQuery({
    campaign: id,
  });
  return (
    <PageTemplate>
      <FluidContainer ref={tablewrapper}>
        <Title size="xl">Prospect</Title>
        <Button
          as="a"
          href={`/wp-admin/admin.php?page=cp-prospect&id=${id}`}
          className="aq-mr-2"
          size="sm"
          type="link-hover"
        >
          {"<"} Go to old Prospect
        </Button>
        <Button
          as="a"
          href={`/wp-admin/admin.php?page=cp-prospect-crowd&id=${id}`}
          className="aq-mr-2"
          size="sm"
          type="link-hover"
        >
          Pay Assistants
        </Button>
        <Button
          as="a"
          href={`/wp-admin/admin.php?page=add-booty&cid=${id}`}
          className="aq-mr-2"
          size="sm"
          type="link-hover"
        >
          Go to Add Booty
        </Button>
        <Title size="mt" className="aq-mb-3" style={{ display: "flex" }}>
          CP{id} {data?.title ? `- ${data.title}` : ""}
        </Title>
        <Table id={id} containerWidth={width} />
      </FluidContainer>
    </PageTemplate>
  );
};

export default Prospect;
