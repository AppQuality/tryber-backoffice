import { BSCol, BSGrid, Card } from "@appquality/appquality-design-system";
import Filters from "./Filters";
import Table from "./Table";
import FilterContext from "./FilterContext";
import { useParams } from "react-router-dom";

const BugsList = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <FilterContext>
      <BSGrid>
        <BSCol size="col-lg-9 ">
          <Card className="aq-mb-3" bodyClass="">
            <Table id={id} />
          </Card>
        </BSCol>
        <BSCol size="col-lg-3">
          <Card className="aq-mb-3" bodyClass="">
            <Filters id={id} />
          </Card>
        </BSCol>
      </BSGrid>
    </FilterContext>
  );
};

export default BugsList;
