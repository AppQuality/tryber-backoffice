import { Accordion, Card } from "@appquality/appquality-design-system";
import { Section } from "../../components/campaignForm/Section";
import { QuoteTable, QuoteTableRow } from "../QuoteRecap";

export type QuoteHistorySectionProps = {
  history: QuoteTableRow[];
  otherCampaigns: QuoteTableRow[];
};

export const QuoteHistorySection = ({
  history,
  otherCampaigns,
}: QuoteHistorySectionProps) => {
  return (
    <Section
      title="Quote History"
      subtitle="Review past quotes for this campaign or compare with similar templates to ensure accurate pricing"
      id="quote"
    >
      <Card className="aq-mb-4" title="Quote history & comparison">
        <Accordion initialActive="" id="quote-history-accordion">
          <Accordion.Item
            id="quote-history-campaign"
            title="Previous quotes for this campaign"
            key="campaign-quotes"
          >
            {history.length > 0 && <QuoteTable data={history} />}
          </Accordion.Item>
          <Accordion.Item
            id="quote-history-template-workspace"
            title="All other quotes for this template in this workspace"
            key="other-quotes"
          >
            {otherCampaigns.length > 0 ? (
              <QuoteTable data={otherCampaigns} />
            ) : (
              <div>This is the first quote for this workspace.</div>
            )}
          </Accordion.Item>
        </Accordion>
      </Card>
    </Section>
  );
};
