import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";
import { AgreementForm } from "../components/AgreementForm";
import { Card, PageTitle } from "@appquality/appquality-design-system";

const NewAgreementPage = () => {
  return (
    <OpsUserContainer>
      <PageTitle
        back={{ text: "back to list", navigation: "/backoffice/agreements" }}
      >
        New Agreement
      </PageTitle>
      <Card className="aq-pb-4">
        <AgreementForm />
      </Card>
    </OpsUserContainer>
  );
};

export default NewAgreementPage;
