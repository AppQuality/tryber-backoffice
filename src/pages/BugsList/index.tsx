import {
  BSCol,
  BSGrid,
  Button,
  Title,
} from "@appquality/appquality-design-system";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import styled from "styled-components";
import FilterContext from "./FilterContext";
import Filters from "./Filters";
import TagsFilter from "./Filters/TagsFilter";
import Stats from "./Stats";
import Table from "./Table";

const FluidContainer = styled.div`
    max-width: 90%;
    margin: 0 auto;
  }
`;

const HeaderButton = (props: Parameters<typeof Button>[0]) => {
  return <Button {...props} size="sm" kind="link-hover" />;
};

const BugsList = () => {
  const { id } = useParams<{ id: string }>();
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

  return (
    <PageTemplate>
      <FluidContainer>
        <Title size="m">Bug List - CP-{id}</Title>
        <Stats
          id={id}
          isOpen={isStatsModalOpen}
          setIsOpen={setIsStatsModalOpen}
        />
        <HeaderButton
          as="a"
          href={`/wp-admin/admin.php?page=mvc_campaigns`}
          kind="secondary"
          className="aq-mr-2"
        >
          {"<"} To Campaign List
        </HeaderButton>
        <HeaderButton as="a" href={`/campaigns/${id}`} className="aq-mr-2">
          {"<"} To Dashboard
        </HeaderButton>
        <HeaderButton onClick={() => setIsStatsModalOpen(true)}>
          Stats
        </HeaderButton>
        <FilterContext>
          <div className="aq-my-3">
            <Filters id={id} />
          </div>
          <div className="aq-mb-4">
            <TagsFilter id={id} />
          </div>
          <BSGrid>
            <BSCol size="col-lg-12">
              <Table id={id} />
            </BSCol>
          </BSGrid>
        </FilterContext>
      </FluidContainer>
    </PageTemplate>
  );
};

export default BugsList;
