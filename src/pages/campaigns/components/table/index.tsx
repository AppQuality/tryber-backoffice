import { Pagination, Table, Title } from "@appquality/appquality-design-system";
import styled from "styled-components";
import { useFiltersCardContext } from "./FilterContext";
import Customer from "./Filters/Customer";
import MyCampaign from "./Filters/MyCampaign";
import Search from "./Filters/Search";
import Status from "./Filters/Status";
import useCampaigns from "./useCampaigns";
import useColumns from "./useColumns";

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.grid.sizes[2]};
`;

const CampaignsTable = () => {
  const { page, setPage, order } = useFiltersCardContext();
  const columns = useColumns();
  const { isLoading, data, pages } = useCampaigns();
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <FilterContainer className="aq-my-3">
        <div style={{ width: "40%" }}>
          <Title size="l">My Campaigns</Title>
        </div>
        <div style={{ width: "25ch" }}>
          <MyCampaign />
        </div>
      </FilterContainer>
      <FilterContainer className="aq-mb-3">
        <div style={{ width: "30%" }}>
          <Search />
        </div>
        <div style={{ width: "35%" }}>
          <Customer />
        </div>
        <div style={{ width: "17.5%" }}>
          <Status />
        </div>
        <div style={{ width: "17.5%" }}>
          <Customer />
        </div>
      </FilterContainer>
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
