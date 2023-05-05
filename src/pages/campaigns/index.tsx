import CampaignsTable from "./components/table";
import FiltersContext from "./components/table/FilterContext";

const Campaigns = () => {
  return (
    <div style={{ background: "#f1f1f1", float: "left", width: "100%" }}>
      <FiltersContext>
        <CampaignsTable />
      </FiltersContext>
    </div>
  );
};
export default Campaigns;
