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
import { useParams } from "react-router-dom";
import ConfirmButton from "src/pages/campaigns/selection/confirmButton/ConfirmButton";
import ConfirmModal from "src/pages/campaigns/selection/confirmModal/ConfirmModal";

const SelectionPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="selection-page">
      <OpsUserContainer>
        <ConfirmModal id={id} />
        <PageTitle size="regular">Tester selection panel</PageTitle>
        <BSGrid className="aq-my-4">
          <BSCol size="col-lg-6">
            <Card title="Add columns" shadow>
              <ColumnsConfigurator id={id} />
            </Card>
          </BSCol>
          <BSCol size="col-lg-12" className="aq-mt-3">
            <Card className="aq-mb-3">
              <Counter />
              <SelectionTable id={id} />
            </Card>
            <Card>
              <ConfirmButton />
            </Card>
          </BSCol>
        </BSGrid>
      </OpsUserContainer>
    </div>
  );
};
export default SelectionPage;
