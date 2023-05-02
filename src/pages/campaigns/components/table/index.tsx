import { Pagination, Table } from "@appquality/appquality-design-system";
import { useFiltersCardContext } from "./FilterContext";
import Customer from "./Filters/Customer";
import MyCampaign from "./Filters/MyCampaign";
import Search from "./Filters/Search";
import useCampaigns from "./useCampaigns";
import useColumns from "./useColumns";

const CampaignsTable = () => {
  const { page, setPage, filters, order } = useFiltersCardContext();
  const columns = useColumns();
  const { isLoading, data, pages } = useCampaigns(page, {
    mine: filters?.mine ? true : false,
    search: filters?.search ? filters.search : undefined,
    orderBy: order.field,
    order: order.direction,
  });
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
