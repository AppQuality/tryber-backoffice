import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";
import { AgreementForm } from "../components/AgreementForm";
import { PageTitle } from "@appquality/appquality-design-system";

const NewAgreementPage = () => {
  return (
    <OpsUserContainer>
      <PageTitle
        back={{ text: "back to list", navigation: "/backoffice/agreements" }}
      >
        New Agreement
      </PageTitle>
      <AgreementForm />
    </OpsUserContainer>
  );
};

export default NewAgreementPage;
