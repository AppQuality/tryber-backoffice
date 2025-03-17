import {
  useGetCampaignsQuery,
  useGetDossiersByCampaignQuery,
} from "src/services/tryberApi";

const mapData = <
  T extends {
    id?: number;
    name?: string;
    phase?: { name: string };
    quote?: { price: string; status: string };
  }
>(
  x: T[]
) =>
  x.map((y) => ({
    campaign: `CP${y.id} - ${y.name}`,
    phase: y.phase?.name || "unknown",
    amount: y.quote?.price || "unknown",
    quoteStatus: y.quote?.status || "unknown",
  }));

export const useQuoteRecap = ({ campaign }: { campaign: number }) => {
  const { data: dossier } = useGetDossiersByCampaignQuery({
    campaign: campaign.toString(),
  });
  const { data, isLoading, isError } = useGetCampaignsQuery(
    {
      fields: "id,name,quote,phase",
      filterBy: { hasQuote: 1, customer: dossier?.customer?.id },
    },
    {
      skip: !dossier,
    }
  );

  if (!data || !data.items) {
    return {
      data: {
        thisCampaign: mapData([]),
        otherCampaigns: mapData([]),
      },
      isLoading,
      isError,
    };
  }

  const campaignData = data.items.filter((c) => c.id === campaign);
  const otherCampaigns = data.items.filter((c) => c.id !== campaign);

  return {
    data: {
      thisCampaign: mapData(campaignData),
      otherCampaigns: mapData(otherCampaigns),
    },
    isLoading,
    isError,
  };
};
