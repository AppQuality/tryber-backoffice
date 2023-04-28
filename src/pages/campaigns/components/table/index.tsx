import { Table } from "@appquality/appquality-design-system";
import columns from "./columns";
import useCampaigns from "./useCampaigns";

const CampaignsTable = () => {
  const { isLoading, data } = useCampaigns();
  if (isLoading) return <div>Loading...</div>;
  return <Table dataSource={data} columns={columns} />;
};
export default CampaignsTable;
