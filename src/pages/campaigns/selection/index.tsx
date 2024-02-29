import {
  BSCol,
  BSGrid,
  Card,
  PageTitle,
} from "@appquality/appquality-design-system";
import { AuthorizedOnlyContainer } from "src/features/AuthorizedOnlyContainer";
import Counter from "./counter";
import ColumnsConfigurator from "./editPanel/columnsConfigurator";
import SelectionFilters from "./editPanel/selectionFilters";
import SelectionTable from "./SelectionTable";
import { useParams } from "react-router-dom";
import ConfirmButton from "src/pages/campaigns/selection/confirmButton/ConfirmButton";
import ConfirmModal from "src/pages/campaigns/selection/confirmModals/ConfirmSelectionModal";
import ConfirmFormModal from "src/pages/campaigns/selection/confirmModals/ConfirmFormModal";
import styled from "styled-components";
import { PageTemplate } from "src/features/PageTemplate";
import {
  useGetCampaignsByCampaignQuery,
  useGetUsersMePermissionsQuery,
} from "src/services/tryberApi";
import { openFormModal, openSurveyModal } from "./selectionSlice";
import { useAppDispatch } from "src/store";
import ImportSurveyModal from "./ImportSurveyModal";

const BottomCard = styled(Card)`
  .aq-card-body {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: ${(props) => props.theme.grid.sizes[3]};
  }
`;

const SelectionPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetUsersMePermissionsQuery();
  const campaignId = useParams<{ id: string }>().id;
  const { data: campaignData } = useGetCampaignsByCampaignQuery({
    campaign: campaignId,
  });
  const dispatch = useAppDispatch();
  const formAlreadyPresent = () => {
    return !!campaignData?.preselectionFormId;
  };
  const handleImportSurvey = () =>
    formAlreadyPresent()
      ? dispatch(openFormModal())
      : dispatch(openSurveyModal());
  return (
    <PageTemplate>
      <div className="selection-page">
        <AuthorizedOnlyContainer excludeRule={!data?.appq_tester_selection}>
          <ConfirmModal id={id} />
          <ConfirmFormModal
            preselectionFormId={campaignData?.preselectionFormId}
          />
          <ImportSurveyModal />
          <PageTitle size="regular">Tester selection panel</PageTitle>
          <BSGrid>
            <BSCol size="col-lg-3">
              <Card title="Add columns" className="aq-mb-3">
                <button onClick={handleImportSurvey}>import jotform</button>
                <ColumnsConfigurator id={id} />
              </Card>
              <SelectionFilters id={id} />
            </BSCol>
            <BSCol size="col-lg-9">
              <Card className="aq-mb-3">
                <SelectionTable id={id} />
              </Card>
              <BottomCard className="aq-mb-3">
                <Counter />
                <ConfirmButton />
              </BottomCard>
            </BSCol>
          </BSGrid>
        </AuthorizedOnlyContainer>
      </div>
    </PageTemplate>
  );
};
export default SelectionPage;
