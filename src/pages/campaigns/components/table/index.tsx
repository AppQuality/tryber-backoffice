import { Pagination, Table } from "@appquality/appquality-design-system";
import { useFiltersCardContext } from "./FilterContext";
import Customer from "./Filters/Customer";
import MyCampaign from "./Filters/MyCampaign";
import Search from "./Filters/Search";
import useCampaigns from "./useCampaigns";
import useColumns from "./useColumns";

const CampaignsTable = () => {
  const { page, setPage, order } = useFiltersCardContext();
  const columns = useColumns();
  const { isLoading, data, pages } = useCampaigns();
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className="aq-my-3">
        <Search />
        <Customer />
        <MyCampaign />
      </div>
      <div style={{ background: "white" }}>
        <Table
          orderBy={order.field}
          order={order.direction}
          isStriped
          dataSource={data}
          columns={columns}
        />
      </div>
      <Pagination onPageChange={setPage} current={page} maxPages={pages} />
    </>
  );
};
export default CampaignsTable;
