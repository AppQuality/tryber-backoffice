import { Pagination, Table } from "@appquality/appquality-design-system";
import { useState } from "react";
import columns from "./columns";
import useCampaigns from "./useCampaigns";

const CampaignsTable = () => {
  const [page, setPage] = useState(1);
  const { isLoading, data, pages } = useCampaigns(page);
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div style={{ background: "white" }}>
        <Table isStriped dataSource={data} columns={columns} />
      </div>
      <Pagination onPageChange={setPage} current={page} maxPages={pages} />
    </>
  );
};
export default CampaignsTable;
