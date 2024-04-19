import { useParams } from "react-router-dom";
import { PageTemplate } from "src/features/PageTemplate";
import CampaignForm from "src/pages/campaigns/components/campaignForm";
import { useGetDossiersByCampaignQuery } from "src/services/tryberApi";

const EditCampaign = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetDossiersByCampaignQuery({ campaign: id });

  return (
    <PageTemplate>
      <CampaignForm dossier={data} />
    </PageTemplate>
  );
};

export default EditCampaign;
