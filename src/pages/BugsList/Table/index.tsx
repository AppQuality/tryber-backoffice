import {
  Table,
  Pagination,
  Card,
  icons,
} from "@appquality/appquality-design-system";
import {
  useGetCampaignsByCampaignBugsQuery,
  GetCampaignsByCampaignBugsApiArg,
} from "src/services/tryberApi";
import { useFiltersCardContext } from "../FilterContext";
import Button from "./TableButton";
import Severity from "./Severity";
import Status from "./Status";
import Type from "./Type";

const LIMIT = 100;

const StarFill = icons.StarFill;

const BugsTable = ({ id }: { id: string }) => {
  const { filters, page, setPage, order, setOrder } = useFiltersCardContext();

  let orderBy: GetCampaignsByCampaignBugsApiArg["orderBy"] = "id";
  if (order.field === "internalId") orderBy = "id";
  if (order.field === "tester") orderBy = "testerId";
  if (order.field === "type") orderBy = "type";
  if (order.field === "severity") orderBy = "severity";
  if (order.field === "status") orderBy = "status";

  const { data, isLoading } = useGetCampaignsByCampaignBugsQuery({
    campaign: id,
    limit: LIMIT,
    start: (page - 1) * LIMIT,
    filterBy: {
      severities: filters.severities ? filters.severities.join(",") : undefined,
      types: filters.types ? filters.types.join(",") : undefined,
      status: filters.status ? filters.status.join(",") : undefined,
      tags: filters.tags ? filters.tags.join(",") : undefined,
      duplication: filters.duplication
        ? filters.duplication.join(",")
        : undefined,
    },
    search: filters.search ? filters.search : undefined,
    orderBy: orderBy,
    order: order ? order.direction : undefined,
  });

  if (isLoading) {
    return <>Loading</>;
  }

  if (!data) {
    return <>Error</>;
  }

  return (
    <Card className="aq-mb-3" bodyClass="" title={`${data.total} Bugs`}>
      <Table
        isStriped
        dataSource={data.items.map((r) => ({
          key: r.id,
          internalId: r.internalId,
          title: {
            title: r.title,
            content: (
              <>
                {r.isFavourite ? <StarFill className="aq-mx-2" /> : null}
                {r.title}
              </>
            ),
          },
          severity: {
            title: r.severity.name,
            content: <Severity severity={r.severity} />,
          },
          status: {
            title: r.status.name,
            content: <Status status={r.status} />,
          },
          type: {
            title: r.type.name,
            content: <Type type={r.type} />,
          },
          tester: `T${r.tester.id}`,
          action: {
            title: "",
            content: (
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button
                  onClick={(event) => {
                    window.parent.postMessage(
                      JSON.stringify({
                        type: "open-review",
                        newTab: event.ctrlKey ? true : false,
                        id: r.id,
                      }),
                      "*"
                    );
                  }}
                  style={{ margin: "0 4px 0 0" }}
                >
                  Review
                </Button>
              </div>
            ),
          },
        }))}
        orderBy={order.field}
        order={order.direction}
        columns={[
          {
            title: "Id",
            dataIndex: "internalId",
            key: "internalId",
            maxWidth: "20ch",
            isSortable: true,
            onSort: (newSort) => setOrder("internalId", newSort),
          },
          {
            title: "Tester",
            dataIndex: "tester",
            key: "tester",
            maxWidth: "10ch",
            isSortable: true,
            onSort: (newSort) => setOrder("tester", newSort),
          },
          {
            title: "Title",
            dataIndex: "title",
            key: "title",
          },
          {
            title: "Status",
            dataIndex: "status",
            key: "status",
            maxWidth: "10ch",
            isSortable: true,
            onSort: (newSort) => setOrder("status", newSort),
          },
          {
            title: "Type",
            dataIndex: "type",
            key: "type",
            maxWidth: "12ch",
            isSortable: true,
            onSort: (newSort) => setOrder("type", newSort),
          },
          {
            title: "Severity",
            dataIndex: "severity",
            key: "severity",
            maxWidth: "10ch",
            isSortable: true,
            onSort: (newSort) => setOrder("severity", newSort),
          },
          {
            title: "",
            dataIndex: "action",
            key: "action",
            maxWidth: "10ch",
            align: "right",
          },
        ]}
      />
      {data.total && data.limit ? (
        <Pagination
          onPageChange={(newPage) => setPage(newPage)}
          current={page}
          maxPages={Math.ceil(data.total / data.limit)}
        />
      ) : null}
    </Card>
  );
};

export default BugsTable;
