import { useState } from "react";
import {
  PatchCampaignsByCampaignProspectApiArg,
  usePatchCampaignsByCampaignProspectMutation,
} from "src/services/tryberApi";

const usePayTesters = (id: string) => {
  const [isPaying, setIsPaying] = useState(false);
  const [payTesters] = usePatchCampaignsByCampaignProspectMutation();

  return {
    isPaying,
    payTesters: (
      testers: PatchCampaignsByCampaignProspectApiArg["body"]["items"]
    ) => {
      setIsPaying(true);
      payTesters({
        campaign: id,
        body: {
          status: "done",
          items: testers,
        },
      })
        .unwrap()
        .catch((e) => {
          alert(e.message);
        })
        .finally(() => {
          setIsPaying(false);
        });
    },
  };
};

export default usePayTesters;
