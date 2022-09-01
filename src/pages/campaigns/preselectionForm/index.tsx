import { BSCol, BSGrid } from "@appquality/appquality-design-system";
import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";
import { FieldsSelectors } from "src/pages/campaigns/preselectionForm/fieldsSelectors";
import { FormConfigurator } from "src/pages/campaigns/preselectionForm/formConfigurator";

function preselectionForm() {
  return (
    <OpsUserContainer>
      <BSGrid className="aq-mt-4">
        <BSCol size="col-lg-4">
          <FieldsSelectors />
        </BSCol>
        <BSCol size="col-lg-8">
          <FormConfigurator />
        </BSCol>
      </BSGrid>
    </OpsUserContainer>
  );
}

export default preselectionForm;
