import {
  BSCol,
  BSGrid,
  Card,
  PageTitle,
} from "@appquality/appquality-design-system";
import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";
import Counter from "./counter";
import ColumnsConfigurator from "./editPanel/columnsConfigurator";
import SelectionTable from "./SelectionTable";

const SelectionPage = () => {
  return (
    <div className="selection-page">
      <OpsUserContainer>
        <PageTitle size="regular">Tester selection panel</PageTitle>
        <BSGrid className="aq-my-4">
          <BSCol size="col-lg-6">
            <Card title="Add columns">
              <ColumnsConfigurator />
            </Card>
          </BSCol>
          <BSCol size="col-lg-12" className="aq-mt-3">
            <Card>
              <Counter />
              <SelectionTable />
            </Card>
          </BSCol>
        </BSGrid>
      </OpsUserContainer>
    </div>
  );
};
export default SelectionPage;
