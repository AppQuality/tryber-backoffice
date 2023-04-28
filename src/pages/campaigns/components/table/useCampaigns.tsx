import {
  GetCampaignsApiResponse,
  useGetCampaignsQuery,
} from "src/services/tryberApi";

type Item = NonNullable<GetCampaignsApiResponse["items"]>[number];

type Must<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
type Campaign = Must<Item>;

const useCampaigns = () => {
  const { isLoading, data } = useGetCampaignsQuery({
    limit: 100,
  });

  if (isLoading || !data || !data.items) {
    return { isLoading: true, data: [] };
  }

  return {
    isLoading: false,
    data: data.items
      .filter((campaign): campaign is Campaign => {
        if (!campaign.id) return false;
        if (!campaign.name) return false;
        return true;
      })
      .map((campaign) => ({
        key: campaign.id,
        id: campaign.id,
        csm: "[49138] Valentina Coppini",
        start_date: "21/10/2022 09:00",
        end_date: "06/12/2022 00:00",
        title_tester: campaign.name,
        title_customer: "Loro Piana E-commerce PROD No regression VII",
        project_name: "Longorm Hitachi",
        result_type: "si",
        customer_name: "Loro Piana",
        type: "Bug Hunting",
        status: "Running",
        visible_to: "Admin Only",
        actions: {
          title: "",
          content: "Edit | View | Bugs ",
        },
      })),
  };
};

export default useCampaigns;
