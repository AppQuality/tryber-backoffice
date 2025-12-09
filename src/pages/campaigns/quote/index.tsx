import { BSCol, BSGrid } from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import { styled } from "styled-components";
import { QuoteInput } from "./QuoteInput";
import { useQuoteRecap } from "./useQuoteRecap";
import { QuoteHistorySection } from "./sections/QuoteHistorySection";
import { RevenueOverviewSection } from "./sections/RevenueOverviewSection";
import { CostAndResourceDetailsSection } from "./sections/CostAndResourceDetailsSection";
import { SummaryFinanceCard } from "./sections/SummaryFinanceCard";
import { FormSectionCard } from "./sections/FormSectionCard";
import { useGetDossiersByCampaignQuery } from "src/services/tryberApi";

const FullGrid = styled(BSGrid)`
  width: 100%;
`;

const StickyContainer = styled.div`
  @media (min-width: ${(p) => p.theme.grid.breakpoints.lg}) {
    position: sticky;
    top: 0;
  }
`;

const EditCampaign = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuoteRecap({ campaign: Number(id) });

  const { data: dossierData, isLoading: isDossierLoading } =
    useGetDossiersByCampaignQuery({
      campaign: id,
    });

  return (
    <PageTemplate>
      <FullGrid>
        <BSCol size="col-lg-8">
          {dossierData?.hasPlan && (
            <QuoteHistorySection
              history={data.history}
              otherCampaigns={data.otherCampaigns}
            />
          )}

          <RevenueOverviewSection />

          <CostAndResourceDetailsSection campaignId={id} />
        </BSCol>

        <BSCol size="col-lg-4">
          <StickyContainer>
            <div className="aq-mb-4">
              {dossierData?.hasPlan && <QuoteInput campaignId={id} />}
              <SummaryFinanceCard campaignId={id} />
              <FormSectionCard />
            </div>
          </StickyContainer>
        </BSCol>
      </FullGrid>
    </PageTemplate>
  );
};

export default EditCampaign;
