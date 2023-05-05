import CampaignsTable from "./components/table";
import FiltersContext from "./components/table/FilterContext";

const Campaigns = () => {
  return (
    <div style={{ background: "#e5e6e6", float: "left", width: "100%" }}>
      <FiltersContext>
        <CampaignsTable />
      </FiltersContext>
    </div>
  );
};
export default Campaigns;
