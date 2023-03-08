import { BSCol, BSGrid, Card } from "@appquality/appquality-design-system";
import Filters from "./Filters";
import Table from "./Table";
import FilterContext from "./FilterContext";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TagsFilter from "./Filters/TagsFilter";

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
        <div className="aq-my-3">
          <Filters id={id} />
        </div>
        <div className="aq-mb-4">
          <TagsFilter id={id} />
        </div>
        <BSGrid>
          <BSCol size="col-lg-12">
            <Card className="aq-mb-3" bodyClass="">
              <Table id={id} />
            </Card>
          </BSCol>
        </BSGrid>
      </FilterContext>
    </div>
  );
};

export default BugsList;
