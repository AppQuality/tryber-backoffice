import { useParams } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import Form from "src/pages/campaigns/components/form";
import { useGetDossiersByCampaignQuery } from "src/services/tryberApi";

const EditCampaign = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetDossiersByCampaignQuery({ campaign: id });
  console.log(data);
  return (
    <PageTemplate type="unguess">
      <Form dossier={data} />
    </PageTemplate>
  );
};

export default EditCampaign;
