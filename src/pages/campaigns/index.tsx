import { PageTemplate } from "src/features/PageTemplate";
import CampaignsTable from "./components/table";
import FiltersContext from "./components/table/FilterContext";

const Campaigns = () => {
  return (
    <PageTemplate>
      <FiltersContext>
        <CampaignsTable />
      </FiltersContext>
    </PageTemplate>
  );
};
export default Campaigns;
