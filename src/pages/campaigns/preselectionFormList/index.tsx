import { BSCol, BSGrid } from "@appquality/appquality-design-system";
import { OpsUserContainer } from "../../../features/AuthorizedOnlyContainer";
import { FormTableCard } from "./formTableCard";

const PreselectionFormList = () => {
  return (
    <OpsUserContainer>
      <BSGrid className="aq-my-4">
        <BSCol size="col-lg-12" className="aq-mb-4">
          <FormTableCard />
        </BSCol>
      </BSGrid>
    </OpsUserContainer>
  );
};

export default PreselectionFormList;
