import { Table } from "@appquality/appquality-design-system";
import { useState } from "react";
import { useGetCampaignsByCampaignBugsQuery } from "src/services/tryberApi";
import { useFiltersCardContext } from "../FilterContext";
import Button from "./TableButton";
import Severity from "./Severity";
import Status from "./Status";

// TODO: remove this when the API is fixed
const repeat = <T extends unknown>(n: number, value: T[]): T[] => {
  const result: T[] = [];
  for (let i = 0; i < n; i++) {
    result.push(...value);
  }
  return result;
};

const BugsTable = () => {
  const value = useFiltersCardContext();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetCampaignsByCampaignBugsQuery({
    campaign: "1",
  });

  if (isLoading) {
    return <>Loading</>;
  }

  if (!data) {
    return <>Error</>;
  }

  const bugs = repeat(10, data.items);

  return (
    <Table
      dataSource={bugs.map((r) => ({
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
              <Button style={{ margin: "0 4px 0 0" }}>Review</Button>
              <Button> Show</Button>
            </div>
          ),
        },
      }))}
      columns={[
        {
          title: "Id",
          dataIndex: "internalId",
          key: "internalId",
          maxWidth: "10ch",
        },
        {
          title: "Tester",
          dataIndex: "tester",
          key: "tester",
          maxWidth: "8ch",
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
    ></Table>
  );
};

export default BugsTable;
