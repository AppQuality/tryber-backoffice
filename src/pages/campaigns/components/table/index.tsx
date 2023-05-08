import {
  Button,
  Pagination,
  Table,
  Title,
} from "@appquality/appquality-design-system";
import openInWordpress from "src/utils/openInWordpress";
import styled from "styled-components";
import { useFiltersCardContext } from "./FilterContext";
import CampaignTypes from "./Filters/CampaignTypes";
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

const CustomTable = styled(Table)`
  .tbody.cell {
    padding: 0;
  }
  .tbody.cell > div {
    padding: ${({ theme }) => theme.grid.sizes[2]}
      ${({ theme }) => theme.grid.sizes[2]};
    display: flex;
    align-items: center;
    height: 100%;
  }
`;

const CampaignsTable = () => {
  const { page, setPage, order } = useFiltersCardContext();
  const columns = useColumns();
  const { isLoading, data, pages } = useCampaigns();
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <FilterContainer className="aq-my-3">
        <div
          style={{
            width: "40%",
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <Title size="l">My Campaigns</Title>
          <div>
            <Button
              size="sm"
              type="secondary"
              flat
              onClick={(e) => openInWordpress(e, "open-new-campaign")}
            >
              Add campaign
            </Button>
          </div>
        </div>
        <div style={{ width: "25ch" }}>
          <MyCampaign />
        </div>
      </FilterContainer>
      <FilterContainer className="aq-mb-3">
        <div style={{ width: "30%" }}>
          <Search />
        </div>
        <div style={{ width: "32.5%" }}>
          <Customer />
        </div>
        <div style={{ width: "22.5%" }}>
          <CampaignTypes />
        </div>
        <div style={{ width: "15%" }}>
          <Status />
        </div>
      </FilterContainer>
      <div style={{ background: "white" }}>
        <CustomTable
          orderBy={order.field}
          order={order.direction}
          isStriped
          dataSource={data}
          columns={columns}
        />
      </div>
      <Pagination
        className="aq-mt-3"
        onPageChange={setPage}
        current={page}
        maxPages={pages}
      />
    </>
  );
};
export default CampaignsTable;
