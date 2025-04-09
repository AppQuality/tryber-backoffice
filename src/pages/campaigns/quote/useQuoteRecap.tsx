import { useMemo } from "react";
import {
  useGetCampaignsQuery,
  useGetDossiersByCampaignQuery,
  useGetDossiersByCampaignQuotesHistoryQuery,
} from "src/services/tryberApi";

const mapData = <
  T extends {
    id?: number;
    name?: string;
    phase?: { name: string };
    quote?: { id: number; price: string; status: string };
  }
>(
  x: T[]
) =>
  x.map((y) => ({
    campaignId: y.id || 0,
    campaign: `CP${y.id} - ${y.name}`,
    phase: y.phase?.name || "unknown",
    amount: y.quote?.price || "unknown",
    quoteId: y.quote?.id || 0,
    quoteStatus: y.quote?.status || "unknown",
  }));

export const useQuoteRecap = ({ campaign }: { campaign: number }) => {
  const { data: dossier } = useGetDossiersByCampaignQuery({
    campaign: campaign.toString(),
  });
  const { data: historyData } = useGetDossiersByCampaignQuotesHistoryQuery({
    campaign: campaign.toString(),
  });

  const historyItems = (historyData?.items || []).map((h) => ({
    id: h.campaign.id,
    name: h.campaign.title,
    phase: { name: h.campaign.phase_name },
    quote: {
      id: h.quote.id,
      price: h.quote.amount,
      status: h.quote.status,
    },
  }));

  const { data, isLoading, isError } = useGetCampaignsQuery(
    {
      fields: "id,name,quote,phase",
      filterBy: { hasQuote: 1, customer: dossier?.customer?.id },
    },
    {
      skip: !dossier,
    }
  );

  const { thisCampaign, history, otherCampaigns } = useMemo(() => {
    if (!data || !data.items) {
      return {
        thisCampaign: mapData([]),
        history: mapData([]),
        otherCampaigns: mapData([]),
      };
    }

    return {
      thisCampaign: mapData(data.items.filter((c) => c.id === campaign)),
      history: mapData(historyItems),
      otherCampaigns: mapData(data.items.filter((c) => c.id !== campaign)),
    };
  }, [data, campaign]);

  return {
    data: {
      thisCampaign,
      history,
      otherCampaigns,
    },
    isLoading,
    isError,
  };
};
