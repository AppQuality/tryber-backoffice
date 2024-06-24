import { BSCol, BSGrid, Button } from "@appquality/appquality-design-system";
import { OpsUserContainer } from "../../features/AuthorizedOnlyContainer";
import { FormTableCard } from "./components/formTableCard";
import { PageTitle } from "@appquality/appquality-design-system";
import { PageTemplate } from "src/features/PageTemplate";

const PreselectionFormList = () => {
  return (
    <PageTemplate>
      <OpsUserContainer>
        <PageTitle size="regular">
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Preselection Form List</span>
            <Button as="a" href="preselection-forms/new/" className="aq-ml-4">
              Add New
            </Button>
          </div>
        </PageTitle>
        <BSGrid className="aq-my-4">
          <BSCol size="col-lg-12" className="aq-mb-4">
            <FormTableCard />
          </BSCol>
        </BSGrid>
      </OpsUserContainer>
    </PageTemplate>
  );
};

export default PreselectionFormList;
