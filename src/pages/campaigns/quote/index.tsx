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
      <Card>
        <QuoteInput campaignId={id} />
      </Card>
      <Card>
        <QuoteTable data={data.thisCampaign} />
      </Card>
      <Card>
        <QuoteTable data={data.otherCampaigns} />
      </Card>
    </PageTemplate>
  );
};

export default EditCampaign;
