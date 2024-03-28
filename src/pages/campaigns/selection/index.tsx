import {
  BSCol,
  BSGrid,
  Button,
  Card,
  PageTitle,
} from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import { AuthorizedOnlyContainer } from "src/features/AuthorizedOnlyContainer";
import { PageTemplate } from "src/features/PageTemplate";
import ConfirmButton from "src/pages/campaigns/selection/confirmButton/ConfirmButton";
import ConfirmFormModal from "src/pages/campaigns/selection/confirmModals/ConfirmFormModal";
import ConfirmModal from "src/pages/campaigns/selection/confirmModals/ConfirmSelectionModal";
import {
  useGetCampaignsByCampaignQuery,
  useGetUsersMePermissionsQuery,
  useGetUsersMeQuery,
} from "src/services/tryberApi";
import { useAppDispatch } from "src/store";
import styled from "styled-components";
import { FilterRecap } from "./FilterRecap";
import ImportSurveyModal from "./ImportSurveyModal";
import SelectionTable from "./SelectionTable";
import Counter from "./counter";
import ColumnsConfigurator from "./editPanel/columnsConfigurator";
import SelectionFilters from "./editPanel/selectionFilters";
import { openFormModal, openSurveyModal } from "./selectionSlice";
import Report from "./editPanel/Report";

const BottomCard = styled(Card)`
  .aq-card-body {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: ${(props) => props.theme.grid.sizes[3]};
  }
`;

const SelectionPage = () => {
  const { id: campaignId } = useParams<{ id: string }>();
  const { data: permissionData } = useGetUsersMePermissionsQuery();
  const { data: userData } = useGetUsersMeQuery({});
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
        <AuthorizedOnlyContainer
          excludeRule={!permissionData?.appq_tester_selection}
          isFluid
        >
          <ConfirmModal id={campaignId} />
          <ConfirmFormModal
            preselectionFormId={campaignData?.preselectionFormId}
          />
          <ImportSurveyModal id={campaignId} />
          <PageTitle size="regular">Tester selection panel</PageTitle>
          <BSGrid>
            <BSCol size="col-lg-3">
              <Button
                size="block"
                kind="secondary"
                className="aq-mb-2"
                onClick={handleImportSurvey}
              >
                Import jotform
              </Button>
              <Card title="Add columns" className="aq-mb-3">
                <ColumnsConfigurator id={campaignId} />
              </Card>
              <Card
                title="Filters"
                data-qa="selectionFilters"
                className="aq-mb-3"
              >
                <SelectionFilters id={campaignId} />
              </Card>
              <Card title="Report" className="aq-mb-3">
                <Report userData={userData} campaignId={campaignId} />
              </Card>
            </BSCol>
            <BSCol size="col-lg-9">
              <Card className="aq-mb-3">
                <FilterRecap id={campaignId} />
                <SelectionTable id={campaignId} />
              </Card>
              <BottomCard className="aq-mb-3">
                <Counter id={campaignId} />
                <ConfirmButton id={campaignId} />
              </BottomCard>
            </BSCol>
          </BSGrid>
        </AuthorizedOnlyContainer>
      </div>
    </PageTemplate>
  );
};
export default SelectionPage;
