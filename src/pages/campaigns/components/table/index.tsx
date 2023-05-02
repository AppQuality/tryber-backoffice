import {
  Pagination,
  Select,
  Table,
} from "@appquality/appquality-design-system";
import { useState } from "react";
import columns from "./columns";
import useCampaigns from "./useCampaigns";

const CampaignsTable = () => {
  const [page, setPage] = useState(1);
  const [mine, setMine] = useState(false);
  const { isLoading, data, pages } = useCampaigns(page, {
    mine,
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className="aq-my-3">
        <Select
          name="mine"
          label=""
          isClearable={false}
          options={[
            { value: "mine", label: "My Campaigns" },
            { value: "all", label: "All Campaigns" },
          ]}
          onChange={(item) => {
            if (item.value === "mine") setMine(true);
            else setMine(false);
          }}
          value={{ value: mine ? "mine" : "all", label: "" }}
        />
      </div>
      <div style={{ background: "white" }}>
        <Table isStriped dataSource={data} columns={columns} />
      </div>
      <Pagination onPageChange={setPage} current={page} maxPages={pages} />
    </>
  );
};
export default CampaignsTable;
