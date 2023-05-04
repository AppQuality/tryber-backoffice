import CampaignsTable from "./components/table";
import FiltersContext from "./components/table/FilterContext";

const Campaigns = () => {
  return (
    <FiltersContext>
      <CampaignsTable />
    </FiltersContext>
  );
};
export default Campaigns;
