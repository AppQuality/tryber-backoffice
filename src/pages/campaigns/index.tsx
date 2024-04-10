import { PageTemplate } from "src/features/PageTemplate";
import CampaignsTable from "./components/table";
import FiltersContext from "./components/table/FilterContext";

const Campaigns = () => {
  return (
    <PageTemplate>
      <div style={{ background: "#e5e6e6", float: "left", width: "100%" }}>
        <FiltersContext>
          <CampaignsTable />
        </FiltersContext>
      </div>
    </PageTemplate>
  );
};
export default Campaigns;
