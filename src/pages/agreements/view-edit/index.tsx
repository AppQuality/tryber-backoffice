import { Card, PageTitle } from "@appquality/appquality-design-system";
import { OpsUserContainer } from "src/features/AuthorizedOnlyContainer";
import { AgreementForm } from "../components/AgreementForm";
import { useGetAgreementsByAgreementIdQuery } from "src/services/tryberApi";
import { useParams } from "react-router-dom";

const EditAgreementPage = () => {
  const { id } = useParams<{ id: string }>();
  // todo: understand better which data is being fetched here
  const { data, currentData, isLoading, isFetching, isError, refetch } =
    useGetAgreementsByAgreementIdQuery({
      agreementId: id,
    });
  if (isLoading || isFetching) return <div>loading...</div>;
  if (isError) return <div>there was an error</div>;
  return (
    <OpsUserContainer>
      <PageTitle
        // todo: use env vars for this (maybe to use in router and tests too)
        back={{ text: "back to list", navigation: "/backoffice/agreements" }}
      >
        Edit Agreement: {currentData?.title}
      </PageTitle>
      <Card className="aq-pb-4">
        <AgreementForm agreement={currentData} refetch={refetch} />
      </Card>
    </OpsUserContainer>
  );
};

export default EditAgreementPage;
