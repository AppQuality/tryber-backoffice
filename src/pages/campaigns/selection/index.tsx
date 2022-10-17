import {
  BSCol,
  BSGrid,
  Button,
  Card,
  PageTitle,
} from "@appquality/appquality-design-system";
import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";
import Counter from "./counter";
import ColumnsConfigurator from "./editPanel/columnsConfigurator";
import SelectionTable from "./SelectionTable";
import { useParams } from "react-router-dom";

const SelectionPage = () => {
  const { id } = useParams<{ id: string }>();
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
            <Card className="aq-mb-3">
              <Counter />
              <SelectionTable id={id} />
            </Card>
            <Card>
              <div style={{ textAlign: "right" }}>
                <Button>Conferma selezioni</Button>
              </div>
            </Card>
          </BSCol>
        </BSGrid>
      </OpsUserContainer>
    </div>
  );
};
export default SelectionPage;
