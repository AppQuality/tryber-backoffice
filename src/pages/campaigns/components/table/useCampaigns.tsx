import { Button, Skeleton, Text } from "@appquality/appquality-design-system";
import { useEffect } from "react";
import {
  GetCampaignsApiArg,
  GetCampaignsApiResponse,
  useGetCampaignsQuery,
  useGetPhasesQuery,
  usePutDossiersByCampaignPhasesMutation,
} from "src/services/tryberApi";
import openInWordpress from "src/utils/openInWordpress";
import styled from "styled-components";
import BugType from "./BugTypeIcon";
import { useFiltersCardContext } from "./FilterContext";
import ResultTypeIcon from "./ResultTypeIcon";
import StatusIcon from "./StatusIcon";
import VisibilityIcon from "./VisibilityIcon";

const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime.split(" ")[0]).toLocaleDateString("it-IT", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const time = dateTime.split(" ")[1].replace(/:00$/, "");
  return { date, time };
};

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
  const { isLoading, data, refetch } = useGetCampaignsQuery({
    limit: LIMIT,
    start: (page - 1) * LIMIT,
    mine: filters?.mine ? "true" : undefined,
    search: filters?.search ? filters.search : undefined,
    filterBy: {
      type: filters?.type ? filters.type.join(",") : undefined,
      customer: filters?.customer ? filters.customer.join(",") : undefined,
      phase: filters?.status ? filters.status : undefined,
      csm: filters?.csm ? filters.csm : undefined,
      role_1: filters?.pm ? filters.pm : undefined,
    },
    orderBy: order.field,
    order: order.direction,
  });

  useEffect(() => {
    refetch();
  }, [filters?.status, refetch]);

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
      .map((campaign) => {
        const pm = campaign.roles.find((item) => item.role.name === "PM");

        return {
          key: campaign.id,
          id: campaign.id,
          peoples: {
            title: campaign.csm.name,
            content: (
              <>
                {campaign.csm.name !== "Deleted User"
                  ? `${campaign.csm.name.charAt(0)}. ${campaign.csm.surname}`
                  : "Deleted User"}
                {pm && (
                  <Text small>
                    {pm.user.name !== "Deleted User"
                      ? `${pm.user.name.charAt(0)}. ${pm.user.surname}`
                      : "Deleted User"}
                  </Text>
                )}
              </>
            ),
          },
          start_date: {
            title: campaign.startDate,
            content: (
              <>
                <div>{formatDateTime(campaign.startDate).date}</div>
                <Text small>{formatDateTime(campaign.startDate).time}</Text>
              </>
            ),
          },
          end_date: {
            title: campaign.endDate,
            content: (
              <>
                <div>{formatDateTime(campaign.endDate).date}</div>
                <Text small>{formatDateTime(campaign.endDate).time}</Text>
              </>
            ),
          },
          title_customer: {
            title: campaign.customerTitle ?? campaign.name,
            content: (
              <>
                {campaign.customerTitle ?? campaign.name}
                {campaign.customerTitle && <Text small>{campaign.name}</Text>}
              </>
            ),
          },
          result_type: {
            title: ResultTypeIcon.text(campaign.resultType),
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
            title: BugType.text(campaign.type.area, campaign.type.name),
            content: (
              <BugType area={campaign.type.area} name={campaign.type.name} />
            ),
          },
          status: {
            title: StatusIcon.text(campaign.status, campaign.startDate),
            content: (
              <StatusIcon status={campaign.status} start={campaign.startDate} />
            ),
          },
          visible_to: {
            title: VisibilityIcon.text(campaign.visibility),
            content: <VisibilityIcon visibility={campaign.visibility} />,
          },
          phase: {
            title: campaign.phase.name,
            content: isLoading ? (
              <Skeleton />
            ) : (
              <PhaseSelector campaign={campaign} />
            ),
          },
          actions: {
            title: "",
            content: (
              <>
                <TableButton
                  onClick={(e) =>
                    openInWordpress(e, "open-edit", { id: campaign.id })
                  }
                  size="sm"
                  kind="link-hover"
                >
                  Edit
                </TableButton>
                {" | "}
                <TableButton
                  onClick={(e) =>
                    openInWordpress(e, "open-show", { id: campaign.id })
                  }
                  size="sm"
                  kind="link-hover"
                >
                  View
                </TableButton>
                {" | "}
                <TableButton
                  onClick={(e) =>
                    openInWordpress(e, "open-bugs", { id: campaign.id })
                  }
                  size="sm"
                  kind="link-hover"
                >
                  Bugs
                </TableButton>
              </>
            ),
          },
        };
      }),
  };
};

const PhaseSelector = ({ campaign }: { campaign: Campaign }) => {
  const { data, isLoading } = useGetPhasesQuery();
  const [updatePhase] = usePutDossiersByCampaignPhasesMutation();

  if (isLoading || !data || !data.results) return <Skeleton />;

  return (
    <select
      key={`phase-select-${campaign.id}`}
      onChange={(e) => {
        updatePhase({
          campaign: campaign.id.toString(),
          body: { phase: Number(e.target.value) },
        });
      }}
    >
      {data.results.map((opt) => (
        <option
          key={`phase-opt-${campaign.id}-${opt.id}`}
          value={opt.id}
          selected={opt.id === campaign.phase.id}
        >
          {opt.name}
        </option>
      ))}
    </select>
  );
};

export default useCampaigns;
