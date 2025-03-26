import { BSCol, BSGrid, Card } from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import { styled } from "styled-components";
import { Section } from "../components/campaignForm/Section";
import { QuoteInput } from "./QuoteInput";
import { QuoteTable } from "./QuoteRecap";
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

  return (
    <PageTemplate>
      <FullGrid>
        <BSCol size="col-lg-8">
          <Section
            title="Activity Quotation"
            subtitle="Set the price for this activity. Before proceeding, make sure to review the campaign dossier carefully and consider any previous quotes. If quotes have been created through app.unguess, they will be displayed directly on this page for easy comparison."
            id="quote"
          >
            {data.thisCampaign.length > 0 && (
              <Card
                className="aq-mb-4"
                title="Previous quotes for this campaign"
              >
                <QuoteTable data={data.thisCampaign} />
              </Card>
            )}
            <Card
              className="aq-mb-4"
              title="All other quotes in this workspace"
            >
              {data.otherCampaigns.length > 0 ? (
                <QuoteTable data={data.otherCampaigns} />
              ) : (
                <div>This is the first quote for this workspace.</div>
              )}
            </Card>
          </Section>
        </BSCol>
        <BSCol size="col-lg-4">
          <StickyContainer>
            <div className="aq-mb-4">
              <QuoteInput campaignId={id} />
            </div>
          </StickyContainer>
        </BSCol>
      </FullGrid>
    </PageTemplate>
  );
};

export default EditCampaign;
