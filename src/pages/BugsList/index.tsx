import { BSCol, BSGrid, Card } from "@appquality/appquality-design-system";
import Filters from "./Filters";
import Table from "./Table";
import FilterContext from "./FilterContext";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const StickyCol = styled(BSCol)`
  position: sticky;
  top: 0;
  z-index: 1;
`;
const BugsList = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <FilterContext>
        <BSGrid>
          <BSCol size="col-lg-9">
            <Card className="aq-mb-3" bodyClass="">
              <Table id={id} />
            </Card>
          </BSCol>
          <StickyCol>
            <Card className="aq-mb-3" title="Filters">
              <Filters id={id} />
            </Card>
          </StickyCol>
        </BSGrid>
      </FilterContext>
    </div>
  );
};

export default BugsList;
