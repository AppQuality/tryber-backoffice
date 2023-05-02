import { Pagination, Table } from "@appquality/appquality-design-system";
import { useFiltersCardContext } from "./FilterContext";
import MyCampaign from "./Filters/MyCampaign";
import Search from "./Filters/Search";
import columns from "./columns";
import useCampaigns from "./useCampaigns";

const CampaignsTable = () => {
  const { page, setPage, filters } = useFiltersCardContext();
  const { isLoading, data, pages } = useCampaigns(page, {
    mine: filters?.mine ? true : false,
    search: filters?.search ? filters.search : undefined,
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className="aq-my-3">
        <Search />
        <MyCampaign />
      </div>
      <div style={{ background: "white" }}>
        <Table isStriped dataSource={data} columns={columns} />
      </div>
      <Pagination onPageChange={setPage} current={page} maxPages={pages} />
    </>
  );
};
export default CampaignsTable;
