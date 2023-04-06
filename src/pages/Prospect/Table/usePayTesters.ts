import { useState } from "react";
import {
  PutCampaignsByCampaignProspectApiArg,
  usePutCampaignsByCampaignProspectMutation,
} from "src/services/tryberApi";

const usePayTesters = (id: string) => {
  const [isPaying, setIsPaying] = useState(false);
  const [payTesters] = usePutCampaignsByCampaignProspectMutation();

  return {
    isPaying,
    payTesters: (
      testers: PutCampaignsByCampaignProspectApiArg["body"]["items"]
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
