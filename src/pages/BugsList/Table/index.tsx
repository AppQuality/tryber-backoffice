import { Table, Pagination } from "@appquality/appquality-design-system";
import { useState } from "react";
import { useGetCampaignsByCampaignBugsQuery } from "src/services/tryberApi";
import { useFiltersCardContext } from "../FilterContext";
import Button from "./TableButton";
import Severity from "./Severity";
import Status from "./Status";

const BugsTable = ({ id }: { id: string }) => {
  const { filters } = useFiltersCardContext();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetCampaignsByCampaignBugsQuery({
    campaign: id,
    limit: 100,
    start: (page - 1) * 10,
    filterBy: {
      severities: filters.severities ? filters.severities.join(",") : undefined,
      status: filters.status ? filters.status.join(",") : undefined,
    },
    search: filters.search ? filters.search : undefined,
  });

  if (isLoading) {
    return <>Loading</>;
  }

  if (!data) {
    return <>Error</>;
  }

  return (
    <>
      <Table
        dataSource={data.items.map((r) => ({
          key: r.id,
          internalId: r.internalId,
          title: r.title,
          severity: {
            title: r.severity.name,
            content: <Severity severity={r.severity} />,
          },
          status: {
            title: r.status.name,
            content: <Status status={r.status} />,
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
                <Button
                  onClick={(event) => {
                    window.parent.postMessage(
                      JSON.stringify({
                        type: "open-bug",
                        newTab: event.ctrlKey ? true : false,
                        id: r.id,
                      }),
                      "*"
                    );
                  }}
                >
                  {" "}
                  Show
                </Button>
              </div>
            ),
          },
        }))}
        columns={[
          {
            title: "Id",
            dataIndex: "internalId",
            key: "internalId",
            maxWidth: "20ch",
          },
          {
            title: "Tester",
            dataIndex: "tester",
            key: "tester",
            maxWidth: "10ch",
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
          },
          {
            title: "Severity",
            dataIndex: "severity",
            key: "severity",
            maxWidth: "10ch",
          },
          {
            title: "",
            dataIndex: "action",
            key: "action",
            maxWidth: "20ch",
            align: "right",
          },
        ]}
      />
      {data.total && data.limit && (
        <Pagination
          onPageChange={(newPage) => setPage(newPage)}
          current={page}
          maxPages={Math.ceil(data.total / data.limit)}
        />
      )}
    </>
  );
};

export default BugsTable;
