import { BSCol, BSGrid, Card } from "@appquality/appquality-design-system";
import Filters from "./Filters";
import Table from "./Table";
import FilterContext from "./FilterContext";

const BugsList = () => {
  return (
    <FilterContext>
      <BSGrid>
        <BSCol size="col-lg-9 ">
          <Card className="aq-mb-3" bodyClass="">
            <Table />
          </Card>
        </BSCol>
        <BSCol size="col-lg-3">
          <Card className="aq-mb-3" bodyClass="">
            <Filters />
          </Card>
        </BSCol>
      </BSGrid>
    </FilterContext>
  );
};

export default BugsList;
