import FakeWPwrapper from "src/components/FakeWpWrapper";
import CampaignsTable from "./components/table";

const Campaigns = () => {
  return (
    <FakeWPwrapper>
      <CampaignsTable />
    </FakeWPwrapper>
  );
};
export default Campaigns;
