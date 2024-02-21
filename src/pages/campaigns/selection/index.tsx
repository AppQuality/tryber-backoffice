import {
  BSCol,
  BSGrid,
  Card,
  PageTitle,
} from "@appquality/appquality-design-system";
import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";
import Counter from "./counter";
import ColumnsConfigurator from "./editPanel/columnsConfigurator";
import SelectionFilters from "./editPanel/selectionFilters";
import SelectionTable from "./SelectionTable";
import { useParams } from "react-router-dom";
import ConfirmButton from "src/pages/campaigns/selection/confirmButton/ConfirmButton";
import ConfirmModal from "src/pages/campaigns/selection/confirmModal/ConfirmModal";
import styled from "styled-components";
import { PageTemplate } from "src/features/PageTemplate";

const StickyToBottomContainer = styled.div`
  position: sticky;
  bottom: 0;
`;

const SelectionPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <PageTemplate>
      <div className="selection-page">
        <OpsUserContainer>
          <ConfirmModal id={id} />
          <PageTitle size="regular">Tester selection panel</PageTitle>
          <BSGrid className="aq-my-4">
            <BSCol size="col-lg-3">
              <Card title="Add columns" className="aq-mb-3">
                <ColumnsConfigurator id={id} />
              </Card>
              <SelectionFilters id={id} />
            </BSCol>
            <BSCol size="col-lg-9">
              <Card className="aq-mb-3">
                <Counter />
                <SelectionTable id={id} />
              </Card>
              <StickyToBottomContainer>
                <Card>
                  <ConfirmButton />
                </Card>
              </StickyToBottomContainer>
            </BSCol>
          </BSGrid>
        </OpsUserContainer>
      </div>
    </PageTemplate>
  );
};
export default SelectionPage;
