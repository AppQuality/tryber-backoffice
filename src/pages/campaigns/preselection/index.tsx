import { BSCol, BSGrid } from "@appquality/appquality-design-system";
import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";

function CampaignPreselection() {
  return (
    <OpsUserContainer>
      <BSGrid className="aq-mt-4">
        <BSCol size="col-lg-4">cards</BSCol>
        <BSCol size="col-lg-8">configuratore</BSCol>
      </BSGrid>
    </OpsUserContainer>
  );
}

export default CampaignPreselection;
