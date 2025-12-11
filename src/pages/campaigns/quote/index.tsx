import { BSCol, BSGrid } from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import { useGetDossiersByCampaignQuery } from "src/services/tryberApi";
import { styled } from "styled-components";
import { QuoteFormContext } from "./QuoteFormContext";
import { QuoteInput } from "./QuoteInput";
import { CostAndResourceDetailsSection } from "./sections/CostAndResourceDetailsSection";
import { FormSectionCard } from "./sections/FormSectionCard";
import { QuoteHistorySection } from "./sections/QuoteHistorySection";
import { RevenueOverviewSection } from "./sections/RevenueOverviewSection";
import { SummaryFinanceCard } from "./sections/SummaryFinanceCard";
import { useQuoteRecap } from "./useQuoteRecap";

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
        <QuoteFormContext>
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
                <FormSectionCard campaignId={id} />
              </div>
            </StickyContainer>
          </BSCol>
        </QuoteFormContext>
      </FullGrid>
    </PageTemplate>
  );
};

export default EditCampaign;
