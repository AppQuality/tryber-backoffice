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
import useTableRows from "src/pages/campaigns/selection/SelectionTable/useTableRows";
import ErrorUnauthorized from "src/pages/campaigns/selection/ErrorUnauthorized/ErrorUnauthorized";

const SelectionPage = () => {
  const { id } = useParams<{ id: string }>();
  const { error } = useTableRows(id.toString());
  return (
    <div className="selection-page">
      <OpsUserContainer>
        <ConfirmModal />
        <PageTitle size="regular">Tester selection panel</PageTitle>
        <BSGrid className="aq-my-4">
          <BSCol size="col-lg-6">
            <Card title="Add columns">
              <ColumnsConfigurator />
            </Card>
          </BSCol>
          <BSCol size="col-lg-12" className="aq-mt-3">
            {error && "status" in error && error.status === 502 ? (
              <Card>
                <ErrorUnauthorized />
              </Card>
            ) : (
              <>
                <Card className="aq-mb-3">
                  <Counter />
                  <SelectionTable id={id} />
                </Card>
                <Card>
                  <ConfirmButton />
                </Card>
              </>
            )}
          </BSCol>
        </BSGrid>
      </OpsUserContainer>
    </div>
  );
};
export default SelectionPage;
