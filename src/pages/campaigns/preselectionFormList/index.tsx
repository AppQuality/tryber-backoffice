import {
  BSCol,
  BSGrid,
  Card,
  Input,
} from "@appquality/appquality-design-system";
import { OpsUserContainer } from "../../../features/AuthorizedOnlyContainer";
import { FormSearchCard } from "./formSearchCard";
import { FormTableCard } from "./formTableCard";

const PreselectionFormList = () => {
  return (
    <OpsUserContainer>
      <BSGrid className="aq-my-4">
        <BSCol size="col-lg-4">
          <FormSearchCard />
        </BSCol>
        <BSCol size="col-lg-8">
          <FormTableCard />
        </BSCol>
      </BSGrid>
    </OpsUserContainer>
  );
};

export default PreselectionFormList;
