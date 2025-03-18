import { useMemo } from "react";
import {
  useGetCampaignsQuery,
  useGetDossiersByCampaignQuery,
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
  const { data, isLoading, isError } = useGetCampaignsQuery(
    {
      fields: "id,name,quote,phase",
      filterBy: { hasQuote: 1, customer: dossier?.customer?.id },
    },
    {
      skip: !dossier,
    }
  );

  const { thisCampaign, otherCampaigns } = useMemo(() => {
    if (!data || !data.items) {
      return {
        thisCampaign: mapData([]),
        otherCampaigns: mapData([]),
      };
    }

    return {
      thisCampaign: mapData(data.items.filter((c) => c.id === campaign)),
      otherCampaigns: mapData(data.items.filter((c) => c.id !== campaign)),
    };
  }, [data]);

  return {
    data: {
      thisCampaign,
      otherCampaigns,
    },
    isLoading,
    isError,
  };
};
