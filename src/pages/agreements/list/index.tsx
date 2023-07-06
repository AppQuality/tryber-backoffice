import { Button, PageTitle } from "@appquality/appquality-design-system";
import { useHistory } from "react-router-dom";
import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";

const AgreementsListPage = () => {
  const history = useHistory();
  return (
    <OpsUserContainer>
      <PageTitle>Agreements</PageTitle>
      <div className="aq-mb-3">work in progress</div>
      <Button
        type="primary"
        onClick={() => {
          history.push("/backoffice/agreements/new");
        }}
      >
        create new agreement
      </Button>
    </OpsUserContainer>
  );
};

export default AgreementsListPage;
