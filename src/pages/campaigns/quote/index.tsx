import { Card } from "@appquality/appquality-design-system";
import { useParams } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import { QuoteInput } from "./QuoteInput";
import { QuoteTable } from "./QuoteRecap";
import { useQuoteRecap } from "./useQuoteRecap";

const EditCampaign = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useQuoteRecap({ campaign: Number(id) });

  return (
    <PageTemplate>
      <div className="aq-p-4">
        <Card className="aq-mb-4">
          <QuoteInput campaignId={id} />
        </Card>
        {data.thisCampaign.length > 0 && (
          <Card className="aq-mb-4" title="Quotazioni per questa campagna">
            <QuoteTable data={data.thisCampaign} />
          </Card>
        )}
        <Card className="aq-mb-4" title="Quotazioni per questo cliente">
          {data.otherCampaigns.length > 0 ? (
            <QuoteTable data={data.otherCampaigns} />
          ) : (
            <div>Questa è la prima quotazione per questo cliente</div>
          )}
        </Card>
      </div>
    </PageTemplate>
  );
};

export default EditCampaign;
