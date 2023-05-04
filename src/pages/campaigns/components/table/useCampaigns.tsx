import { Button, Text } from "@appquality/appquality-design-system";
import {
  GetCampaignsApiArg,
  GetCampaignsApiResponse,
  useGetCampaignsQuery,
} from "src/services/tryberApi";
import styled from "styled-components";
import BugTypeIcon from "./BugTypeIcon";
import { useFiltersCardContext } from "./FilterContext";
import ResultTypeIcon from "./ResultTypeIcon";
import StatusIcon from "./StatusIcon";
import VisibilityIcon from "./VisibilityIcon";

const TableButton = styled(Button)`
  padding: 0;
`;
type Item = NonNullable<GetCampaignsApiResponse["items"]>[number];

type Must<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
type Campaign = Must<Item>;

const useCampaigns = (options?: {
  mine: boolean;
  search?: string;
  order?: GetCampaignsApiArg["order"];
  orderBy?: GetCampaignsApiArg["orderBy"];
}) => {
  const LIMIT = 100;
  const { page, filters, order } = useFiltersCardContext();
  const { isLoading, data } = useGetCampaignsQuery({
    limit: LIMIT,
    start: (page - 1) * LIMIT,
    mine: filters?.mine ? "true" : undefined,
    search: filters?.search ? filters.search : undefined,
    filterBy: {
      customer: filters?.customer ? filters.customer.join(",") : undefined,
    },
    orderBy: order.field,
    order: order.direction,
  });

  if (isLoading || !data || !data.items) {
    return { isLoading: true, data: [], pages: 0 };
  }

  return {
    isLoading: false,
    pages: data.total ? Math.ceil(data.total / LIMIT) : 0,
    data: data.items
      .filter((campaign): campaign is Campaign => {
        if (typeof campaign.id === "undefined") return false;
        if (typeof campaign.name === "undefined") return false;
        if (typeof campaign.csm === "undefined") return false;
        if (typeof campaign.startDate === "undefined") return false;
        if (typeof campaign.endDate === "undefined") return false;
        if (typeof campaign.customerTitle === "undefined") return false;
        if (typeof campaign.project === "undefined") return false;
        if (typeof campaign.customer === "undefined") return false;
        if (typeof campaign.status === "undefined") return false;
        if (typeof campaign.resultType === "undefined") return false;
        if (typeof campaign.type === "undefined") return false;
        if (typeof campaign.visibility === "undefined") return false;
        return true;
      })
      .map((campaign) => ({
        key: campaign.id,
        id: campaign.id,
        csm:
          campaign.csm.name !== "Deleted User"
            ? `${campaign.csm.name.charAt(0)}. ${campaign.csm.surname}`
            : "Deleted User",
        start_date: {
          title: campaign.startDate,
          content: (
            <>
              <div>{campaign.startDate.split(" ")[0]}</div>
              <Text small>{campaign.startDate.split(" ")[1]}</Text>
            </>
          ),
        },
        end_date: {
          title: campaign.endDate,
          content: (
            <>
              <div>{campaign.endDate.split(" ")[0]}</div>
              <Text small>{campaign.endDate.split(" ")[1]}</Text>
            </>
          ),
        },
        title_tester: { title: campaign.name, content: campaign.name },
        title_customer: campaign.customerTitle
          ? campaign.customerTitle
          : campaign.name,
        result_type: {
          title: campaign.resultType,
          content: <ResultTypeIcon resultType={campaign.resultType} />,
        },
        project: {
          title: campaign.customer.name,
          content: (
            <>
              {campaign.project.name}
              <Text small>{campaign.customer.name}</Text>
            </>
          ),
        },
        type: {
          title: campaign.type.name,
          content: (
            <>
              <BugTypeIcon area={campaign.type.area} /> {campaign.type.name}
            </>
          ),
        },
        status: {
          title: campaign.status,
          content: (
            <StatusIcon status={campaign.status} start={campaign.startDate} />
          ),
        },
        visible_to: {
          title: campaign.visibility,
          content: <VisibilityIcon visibility={campaign.visibility} />,
        },
        actions: {
          title: "",
          content: (
            <>
              <TableButton
                onClick={() => {
                  alert("Navigate to edit page " + campaign.id);
                }}
                size="sm"
                type="link-hover"
              >
                Edit
              </TableButton>
              {" | "}
              <TableButton
                onClick={() => {
                  alert("Navigate to view page " + campaign.id);
                }}
                size="sm"
                type="link-hover"
              >
                View
              </TableButton>
              {" | "}
              <TableButton
                onClick={() => {
                  alert("Navigate to bugs page " + campaign.id);
                }}
                size="sm"
                type="link-hover"
              >
                Bugs
              </TableButton>
            </>
          ),
        },
      })),
  };
};

export default useCampaigns;
