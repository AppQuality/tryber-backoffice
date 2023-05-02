import FakeWPwrapper from "src/components/FakeWpWrapper";
import CampaignsTable from "./components/table";
import FiltersContext from "./components/table/FilterContext";

const Campaigns = () => {
  return (
    <FakeWPwrapper>
      <FiltersContext>
        <CampaignsTable />
      </FiltersContext>
    </FakeWPwrapper>
  );
};
export default Campaigns;
